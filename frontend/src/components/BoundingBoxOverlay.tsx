import type { BoundingBox } from "../types/prediction";

interface BoundingBoxOverlayProps {
  imageUrl: string;
  box: BoundingBox | null;
  label: string | null;
  naturalWidth: number;
  naturalHeight: number;
}

export function BoundingBoxOverlay({
  imageUrl,
  box,
  label,
  naturalWidth,
  naturalHeight,
}: BoundingBoxOverlayProps) {
  if (!box || !naturalWidth || !naturalHeight) {
    return <img src={imageUrl} alt="Uploaded waste" className="w-full rounded-lg" />;
  }

  // Bounding box পিক্সেল coordinate থেকে percentage-এ কনভার্ট করছি,
  // যাতে ছবি যেকোনো সাইজে display হোক না কেন box ঠিক জায়গায় বসে
  const left = (box.x1 / naturalWidth) * 100;
  const top = (box.y1 / naturalHeight) * 100;
  const width = ((box.x2 - box.x1) / naturalWidth) * 100;
  const height = ((box.y2 - box.y1) / naturalHeight) * 100;

  return (
    <div className="relative">
      <img src={imageUrl} alt="Uploaded waste" className="w-full rounded-lg" />
      <div
        className="absolute border-2 border-green-500"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
        }}
      >
        {label && (
          <span className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
