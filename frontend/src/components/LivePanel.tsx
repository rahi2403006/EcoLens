import { useEffect, useRef } from "react";
import { Play, Square } from "lucide-react";
import { useWebcam } from "../hooks/useWebcam";
import { useLive } from "../hooks/useLive";
import { BoxLayer } from "./BoxLayer";
import { DetectionResult } from "./DetectionResult";
import type { PredictionResponse } from "../types/prediction";

const LOG_GAP_MS = 10000;

export function LivePanel({ onConfident }: { onConfident: (result: PredictionResponse) => void }) {
  const cam = useWebcam();
  const live = useLive(cam.grabFrame, 1000);
  const lastLogged = useRef<{ object: string; time: number } | null>(null);

  // Save to history only when the object changes or enough time has passed
  useEffect(() => {
    const r = live.result;
    const p = r?.prediction;
    if (!r || !p?.success || p.low_confidence || !r.recommendation || !p.object) return;
    const now = Date.now();
    const last = lastLogged.current;
    if (!last || last.object !== p.object || now - last.time > LOG_GAP_MS) {
      lastLogged.current = { object: p.object, time: now };
      onConfident(r);
    }
  }, [live.result, onConfident]);

  async function handleStart() {
    if (await cam.start()) live.start();
  }

  function handleStop() {
    live.stop();
    cam.stop();
  }

  const pred = live.result?.prediction;
  const box = pred?.success ? pred.bounding_box : null;
  const status = !live.running ? "Stopped" : live.busy ? "Analysing frame..." : "Waiting for the next frame";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <div className="relative overflow-visible rounded-lg bg-black">
          <video ref={cam.videoRef} autoPlay playsInline muted className={`w-full rounded-lg ${cam.isActive ? "block" : "hidden"}`} />
          {cam.isActive && box && (
            <BoxLayer box={box} naturalWidth={live.frameSize.width} naturalHeight={live.frameSize.height} label={pred?.object} tone={pred?.low_confidence ? "warn" : "ok"} />
          )}
          {!cam.isActive && (
            <div className="flex h-56 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              Camera is off
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-3">
          {!live.running ? (
            <button onClick={handleStart} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 py-2 text-sm text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              <Play size={14} /> Start live detection
            </button>
          ) : (
            <button onClick={handleStop} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
              <Square size={14} /> Stop
            </button>
          )}
        </div>
        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className={`h-2 w-2 rounded-full ${live.running ? (live.busy ? "animate-pulse bg-amber-500" : "bg-emerald-500") : "bg-slate-400"}`} />
          {status}
        </p>
        {(cam.error || live.error) && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{cam.error ?? live.error}</p>}
      </div>

      <div>
        {live.result ? (
          <DetectionResult result={live.result} />
        ) : (
          <p className="text-sm text-slate-400">{live.running ? "Waiting for the first result..." : "Start live detection to see results here."}</p>
        )}
      </div>
    </div>
  );
}
