import type { CollectionStatus } from "../types/monitoring";

const STYLE: Record<CollectionStatus, string> = {
  collected: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  missed: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
};
const LABEL: Record<CollectionStatus, string> = { collected: "Collected", missed: "Missed", pending: "Pending" };

export function RecordBadge({ status }: { status: CollectionStatus }) {
  return <span className={`inline-block rounded px-2 py-0.5 text-xs ${STYLE[status]}`}>{LABEL[status]}</span>;
}
