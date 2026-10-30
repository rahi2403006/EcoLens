import type { BinStatus } from "../types/monitoring";
import { STATUS_LABEL } from "../lib/binStatus";

const STYLE: Record<BinStatus, string> = {
  normal: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  full: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
  faulty: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

export function StatusBadge({ status }: { status: BinStatus }) {
  return <span className={`inline-block rounded px-2 py-0.5 text-xs ${STYLE[status]}`}>{STATUS_LABEL[status]}</span>;
}
