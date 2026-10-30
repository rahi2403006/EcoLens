import { useContext } from "react";
import { MonitoringContext } from "../context/monitoringContext";

export function useMonitoring() {
  const ctx = useContext(MonitoringContext);
  if (!ctx) throw new Error("useMonitoring must be used inside MonitoringProvider");
  return ctx;
}
