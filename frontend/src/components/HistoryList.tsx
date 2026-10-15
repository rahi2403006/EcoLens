import type { HistoryEntry } from "../types/prediction";

interface HistoryListProps {
  history: HistoryEntry[];
  onClear: () => void;
}

const CATEGORY_ICON: Record<string, string> = {
  plastic: "🔵",
  paper: "📄",
  metal: "🔩",
  glass: "🍾",
  organic: "🍃",
  other: "📦",
};

function formatTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryList({ history, onClear }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-gray-400">No detections yet. Try uploading an image.</p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">Recent detections</p>
        <button onClick={onClear} className="text-xs text-gray-400 hover:text-gray-600">
          Clear
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="min-w-[110px] bg-white border rounded-lg p-2 text-center flex-shrink-0"
          >
            <p className="text-xl">{CATEGORY_ICON[entry.object] ?? "📦"}</p>
            <p className="text-xs font-medium capitalize mt-1">{entry.object}</p>
            <p className="text-xs text-gray-400">{(entry.confidence * 100).toFixed(0)}%</p>
            <p className="text-[10px] text-gray-400 mt-1">{formatTime(entry.timestamp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
