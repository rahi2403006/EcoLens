import type { AlertLog, AlertMode, CollectionRecord, MonitoringState, Speed } from "../types/monitoring";
import { statusFromFill } from "./binStatus";
import { createSeed } from "../data/seed";

export type MonitoringAction =
  | { type: "TICK"; speed: Speed }
  | { type: "SEND_REQUEST"; binId: string; mode: AlertMode }
  | { type: "RESOLVE"; recordId: string; status: "collected" | "missed" }
  | { type: "SET_AUTO"; on: boolean }
  | { type: "RESET" };

const uid = (p: string) => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function withRequest(state: MonitoringState, binId: string, mode: AlertMode): MonitoringState {
  const bin = state.bins.find((b) => b.id === binId);
  if (!bin) return state;
  const hasPending = state.records.some((r) => r.binId === binId && r.status === "pending");
  if (hasPending) return state;
  if (mode === "auto" && bin.openRequest) return state;

  const sentAt = new Date().toISOString();
  const alert: AlertLog = {
    id: uid("a"), binId, companyId: bin.companyId, mode, sentAt,
    message: `Bin in ${bin.name} (${bin.location}) is ${bin.fillLevel}% full. Please collect.`,
  };
  const record: CollectionRecord = {
    id: uid("r"), binId, companyId: bin.companyId, date: sentAt, status: "pending", alertId: alert.id,
  };
  return {
    ...state,
    alerts: [alert, ...state.alerts],
    records: [record, ...state.records],
    bins: state.bins.map((b) => (b.id === binId ? { ...b, openRequest: true } : b)),
  };
}

function fillStep(speed: Speed): number {
  if (speed === "fast") return Math.floor(Math.random() * 4);
  if (speed === "normal") return Math.floor(Math.random() * 2);
  return Math.random() < 0.25 ? 1 : 0;
}

export function monitoringReducer(state: MonitoringState, action: MonitoringAction): MonitoringState {
  switch (action.type) {
    case "TICK": {
      const t = new Date().toISOString();
      const bins = state.bins.map((b) => {
        let online = b.sensorOnline;
        if (online && Math.random() < 0.005) online = false;
        else if (!online && Math.random() < 0.05) online = true;
        const fill = online ? Math.min(100, b.fillLevel + fillStep(action.speed)) : b.fillLevel;
        return {
          ...b, sensorOnline: online, fillLevel: fill,
          status: statusFromFill(fill, online),
          lastUpdated: online ? t : b.lastUpdated,
        };
      });
      let next: MonitoringState = { ...state, bins };
      if (state.autoMode) {
        for (const b of bins) if (b.status === "full" && !b.openRequest) next = withRequest(next, b.id, "auto");
      }
      return next;
    }
    case "SEND_REQUEST":
      return withRequest(state, action.binId, action.mode);
    case "RESOLVE": {
      const rec = state.records.find((r) => r.id === action.recordId);
      if (!rec || rec.status !== "pending") return state;
      return {
        ...state,
        records: state.records.map((r) => (r.id === rec.id ? { ...r, status: action.status } : r)),
        bins: state.bins.map((b) =>
          b.id === rec.binId && action.status === "collected"
            ? { ...b, fillLevel: 0, openRequest: false, status: statusFromFill(0, b.sensorOnline), lastUpdated: new Date().toISOString() }
            : b,
        ),
      };
    }
    case "SET_AUTO":
      return { ...state, autoMode: action.on };
    case "RESET":
      return createSeed();
    default:
      return state;
  }
}
