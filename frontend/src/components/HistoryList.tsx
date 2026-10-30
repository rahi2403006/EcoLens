import type { HistoryEntry } from "../types/prediction";

const ICON: Record<string, string> = { plastic: "🔵", Paper: "📄", Metal: "🔩", Glass: "🍾", Organic: "🍃", Other: "📦" };

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function HistoryList({ history, onClear }: { history: HistoryEntry[]; onClear: () => void }) {
  if (history.length === 0) {
    return <p className="text-sm text-slate-400">No detections yet. Try uploading an image.</p>;
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Recent detections</p>
        <button onClick={onClear} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Clear</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {history.map((e) => (
          <div key={e.id} className="min-w-[110px] shrink-0 rounded-lg border border-slate-200 bg-white p-2 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xl">{ICON[e.object] ?? "📦"}</p>
            <p className="mt-1 text-xs font-medium capitalize">{e.object}</p>
            <p className="text-xs text-slate-400">{(e.confidence * 100).toFixed(0)}%</p>
            <p className="mt-1 text-[10px] text-slate-400">{formatTime(e.timestamp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
