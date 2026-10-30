import { useCallback, useEffect, useRef, useState } from "react";
import { predictWaste } from "../services/api";
import type { PredictionResponse } from "../types/prediction";
import type { Frame } from "./useWebcam";

const MAX_FAILURES = 3;

// Repeats: grab a frame -> send it -> wait for the answer -> wait intervalMs -> repeat.
// A new frame is never sent while the previous request is still running.
export function useLive(grabFrame: () => Promise<Frame | null>, intervalMs = 1000) {
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [error, setError] = useState<string | null>(null);

  const runRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);
  const failuresRef = useRef(0);

  const stop = useCallback(() => {
    runRef.current = false;
    window.clearTimeout(timerRef.current);
    setRunning(false);
    setBusy(false);
  }, []);

  const start = useCallback(() => {
    if (runRef.current) return;
    runRef.current = true;
    failuresRef.current = 0;
    setRunning(true);
    setError(null);
    setResult(null);

    const tick = async () => {
      if (!runRef.current) return;
      const frame = await grabFrame();
      if (frame && runRef.current) {
        setBusy(true);
        try {
          const response = await predictWaste(frame.blob);
          if (runRef.current) {
            setResult(response);
            setFrameSize({ width: frame.width, height: frame.height });
            failuresRef.current = 0;
          }
        } catch (err) {
          failuresRef.current += 1;
          if (failuresRef.current >= MAX_FAILURES) {
            setError(err instanceof Error ? err.message : "Live detection stopped after repeated errors.");
            stop();
            return;
          }
        } finally {
          setBusy(false);
        }
      }
      if (runRef.current) timerRef.current = window.setTimeout(tick, intervalMs);
    };
    void tick();
  }, [grabFrame, intervalMs, stop]);

  useEffect(() => stop, [stop]);

  return { running, busy, result, frameSize, error, start, stop };
}
