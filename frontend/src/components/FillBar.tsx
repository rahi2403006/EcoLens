import type { BinStatus } from "../types/monitoring";

const COLOR: Record<BinStatus, string> = {
  normal: "bg-emerald-500",
  warning: "bg-amber-500",
  full: "bg-red-500",
  faulty: "bg-slate-400",
};

export function FillBar({ value, status }: { value: number; status: BinStatus }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div className={`h-full ${COLOR[status]}`} style={{ width: `${value}%` }} />
    </div>
  );
}
