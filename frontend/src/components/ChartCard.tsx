import type { ReactNode } from "react";

export function ChartCard({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      <p className="mb-3 text-sm font-medium">{title}</p>
      <div className="text-slate-500 dark:text-slate-400">{children}</div>
    </div>
  );
}
