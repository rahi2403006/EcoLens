import type { BoundingBox } from "../types/prediction";

interface BoxLayerProps {
  box: BoundingBox;
  naturalWidth: number;
  naturalHeight: number;
  label?: string | null;
  tone?: "ok" | "warn";
}

// Draws a box over its (position: relative) parent. The box comes in pixels of the original
// image, so it is converted to percentages and stays correct at any displayed size.
export function BoxLayer({ box, naturalWidth, naturalHeight, label, tone = "ok" }: BoxLayerProps) {
  if (!naturalWidth || !naturalHeight) return null;
  const left = (box.x1 / naturalWidth) * 100;
  const top = (box.y1 / naturalHeight) * 100;
  const width = ((box.x2 - box.x1) / naturalWidth) * 100;
  const height = ((box.y2 - box.y1) / naturalHeight) * 100;
  const color = tone === "ok" ? "border-emerald-500" : "border-amber-500";
  const labelColor = tone === "ok" ? "bg-emerald-500" : "bg-amber-500";
  const inside = top < 8;

  return (
    <div className={`pointer-events-none absolute border-2 ${color}`} style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}>
      {label && (
        <span className={`absolute left-0 ${inside ? "top-0" : "-top-6"} rounded px-2 py-0.5 text-xs text-white ${labelColor}`}>{label}</span>
      )}
    </div>
  );
}
