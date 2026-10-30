import { createContext } from "react";
import type { AlertMode, MonitoringState, Speed } from "../types/monitoring";

export interface MonitoringContextValue {
  state: MonitoringState;
  paused: boolean;
  setPaused: (p: boolean) => void;
  speed: Speed;
  setSpeed: (s: Speed) => void;
  setAutoMode: (on: boolean) => void;
  sendRequest: (binId: string, mode: AlertMode) => void;
  resolveRecord: (recordId: string, status: "collected" | "missed") => void;
  reset: () => void;
}

export const MonitoringContext = createContext<MonitoringContextValue | null>(null);
