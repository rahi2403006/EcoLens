import { useState } from "react";
import type { BoundingBox } from "../types/prediction";
import { BoxLayer } from "./BoxLayer";

interface Props {
  imageUrl: string;
  box: BoundingBox | null;
  label: string | null;
  tone?: "ok" | "warn";
}

export function BoundingBoxOverlay({ imageUrl, box, label, tone }: Props) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <div className="relative overflow-visible">
      <img
        src={imageUrl}
        alt="Selected waste item"
        className="w-full rounded-lg"
        onLoad={(e) => setSize({ width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight })}
      />
      {box && <BoxLayer box={box} naturalWidth={size.width} naturalHeight={size.height} label={label} tone={tone} />}
    </div>
  );
}
