import { Camera } from "lucide-react";
import { useWebcam } from "../hooks/useWebcam";

interface WebcamCaptureProps {
  onCapture: (file: File, previewUrl: string) => void;
}

export function WebcamCapture({ onCapture }: WebcamCaptureProps) {
  const { videoRef, isActive, error, start, stop, captureFrame } = useWebcam();

  async function handleCapture() {
    const result = await captureFrame();
    if (result) {
      onCapture(result.file, result.previewUrl);
      stop();
    }
  }

  const btn = "flex-1 rounded-lg border border-slate-300 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <video ref={videoRef} autoPlay playsInline muted className={`w-full bg-black ${isActive ? "block" : "hidden"}`} />

      {!isActive && (
        <div className="p-10 text-center">
          <button onClick={start} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
            <Camera size={16} /> Start webcam
          </button>
          {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      )}

      {isActive && (
        <div className="flex gap-2 p-3">
          <button onClick={stop} className={btn}>Cancel</button>
          <button onClick={handleCapture} className="flex-1 rounded-lg bg-slate-900 py-2 text-sm text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
            Capture
          </button>
        </div>
      )}
    </div>
  );
}
