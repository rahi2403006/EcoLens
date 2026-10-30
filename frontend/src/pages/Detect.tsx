import { useEffect, useState } from "react";
import { ImageUpload } from "../components/ImageUpload";
import { WebcamCapture } from "../components/WebcamCapture";
import { LivePanel } from "../components/LivePanel";
import { BoundingBoxOverlay } from "../components/BoundingBoxOverlay";
import { DetectionResult } from "../components/DetectionResult";
import { HistoryList } from "../components/HistoryList";
import { usePrediction } from "../hooks/usePrediction";
import { useHistory } from "../hooks/useHistory";

type Mode = "upload" | "webcam" | "live";
const MODES: { id: Mode; label: string }[] = [
  { id: "upload", label: "Upload" },
  { id: "webcam", label: "Webcam" },
  { id: "live", label: "Live" },
];

export function Detect() {
  const [mode, setMode] = useState<Mode>("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { status, result, error, runPrediction, reset } = usePrediction();
  const { history, addEntry, clearHistory } = useHistory();

  useEffect(() => {
    if (status === "success" && result) addEntry(result);
  }, [status, result, addEntry]);

  function handleImageSelected(file: File, url: string) {
    setImageFile(file);
    setPreviewUrl(url);
    reset();
  }

  function handleReset() {
    setImageFile(null);
    setPreviewUrl(null);
    reset();
  }

  function handleModeChange(next: Mode) {
    setMode(next);
    handleReset();
  }

  const pred = result?.prediction;
  const outline = "rounded-lg border border-slate-300 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800";

  return (
    <div>
      <h1 className="mb-4 text-xl font-medium">Detect waste</h1>

      {(!previewUrl || mode === "live") && (
        <div className="mb-4 flex gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => handleModeChange(m.id)}
              className={`rounded-lg border px-4 py-1.5 text-sm ${
                mode === m.id
                  ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                  : "border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {mode === "live" && <LivePanel onConfident={addEntry} />}

      {mode !== "live" && !previewUrl && (
        <>
          {mode === "upload" && <ImageUpload onImageSelected={handleImageSelected} />}
          {mode === "webcam" && <WebcamCapture onCapture={handleImageSelected} />}
        </>
      )}

      {mode !== "live" && previewUrl && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <BoundingBoxOverlay
              imageUrl={previewUrl}
              box={pred?.bounding_box ?? null}
              label={pred?.object ?? null}
              tone={pred?.low_confidence ? "warn" : "ok"}
            />
            <div className="mt-3 flex gap-2">
              <button onClick={handleReset} className={`flex-1 ${outline}`}>Reset</button>
              <button
                onClick={() => imageFile && runPrediction(imageFile)}
                disabled={status === "loading"}
                className="flex-1 rounded-lg bg-slate-900 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {status === "loading" ? "Detecting..." : "Detect waste"}
              </button>
            </div>
          </div>

          <div>
            {status === "error" && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}
            {status === "success" && result && <DetectionResult result={result} />}
            {status === "idle" && <p className="text-sm text-slate-400">Click &ldquo;Detect waste&rdquo; to identify this item.</p>}
          </div>
        </div>
      )}

      <div className="mt-8">
        <HistoryList history={history} onClear={clearHistory} />
      </div>
    </div>
  );
}
