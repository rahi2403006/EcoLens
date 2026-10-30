import type { Bin } from "../types/monitoring";
import { StatusBadge } from "./StatusBadge";
import { FillBar } from "./FillBar";

interface BinListProps {
  bins: Bin[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function BinList({ bins, selectedId, onSelect }: BinListProps) {
  return (
    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
      {bins.map((b) => (
        <li key={b.id}>
          <button
            onClick={() => onSelect(b.id)}
            className={`grid w-full grid-cols-[1fr_72px_64px] items-center gap-2 px-3 py-2 text-left text-sm ${
              b.id === selectedId ? "bg-emerald-50 dark:bg-emerald-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span className="truncate">{b.name}</span>
            <span className="flex items-center gap-1.5">
              <FillBar value={b.fillLevel} status={b.status} />
              <span className="w-8 text-right text-xs text-slate-500 dark:text-slate-400">{b.fillLevel}%</span>
            </span>
            <StatusBadge status={b.status} />
          </button>
        </li>
      ))}
    </ul>
  );
}
