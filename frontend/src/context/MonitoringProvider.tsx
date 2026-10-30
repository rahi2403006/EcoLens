import { useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { MonitoringContext } from "./monitoringContext";
import { monitoringReducer } from "../lib/monitoringReducer";
import { createSeed } from "../data/seed";
import type { AlertMode, MonitoringState, Speed } from "../types/monitoring";

const KEY = "ecolens_state_v1";
const SPEED_KEY = "ecolens_speed";
const TICK_MS = 5000;

function loadState(): MonitoringState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.bins) && Array.isArray(parsed.records)) return parsed;
    }
  } catch {
    // damaged data: fall through to a fresh seed
  }
  return createSeed();
}

function loadSpeed(): Speed {
  try {
    const v = localStorage.getItem(SPEED_KEY);
    if (v === "slow" || v === "normal" || v === "fast") return v;
  } catch {
    // ignore
  }
  return "slow";
}

export function MonitoringProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(monitoringReducer, null, () => loadState());
  const [paused, setPaused] = useState(false);
  const [speed, setSpeedState] = useState<Speed>(loadSpeed);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // storage full or blocked: keep running in memory
    }
  }, [state]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => dispatch({ type: "TICK", speed }), TICK_MS);
    return () => clearInterval(id);
  }, [paused, speed]);

  const value = useMemo(
    () => ({
      state, paused, setPaused, speed,
      setSpeed: (s: Speed) => {
        setSpeedState(s);
        try { localStorage.setItem(SPEED_KEY, s); } catch { /* ignore */ }
      },
      setAutoMode: (on: boolean) => dispatch({ type: "SET_AUTO", on }),
      sendRequest: (binId: string, mode: AlertMode) => dispatch({ type: "SEND_REQUEST", binId, mode }),
      resolveRecord: (recordId: string, status: "collected" | "missed") => dispatch({ type: "RESOLVE", recordId, status }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state, paused, speed],
  );

  return <MonitoringContext.Provider value={value}>{children}</MonitoringContext.Provider>;
}
