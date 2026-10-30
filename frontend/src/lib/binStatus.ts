import type { BinStatus } from "../types/monitoring";

export const WARNING_AT = 60;
export const FULL_AT = 85;

export function statusFromFill(fill: number, sensorOnline: boolean): BinStatus {
  if (!sensorOnline) return "faulty";
  if (fill >= FULL_AT) return "full";
  if (fill >= WARNING_AT) return "warning";
  return "normal";
}

export const STATUS_LABEL: Record<BinStatus, string> = {
  normal: "Normal",
  warning: "Warning",
  full: "Full",
  faulty: "Faulty",
};

export const STATUS_COLOR: Record<BinStatus, string> = {
  normal: "#1D9E75",
  warning: "#EF9F27",
  full: "#E24B4A",
  faulty: "#888780",
};
