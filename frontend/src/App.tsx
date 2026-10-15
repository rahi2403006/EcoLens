import { useState, useEffect } from "react";
import { ImageUpload } from "./components/ImageUpload";
import { WebcamCapture } from "./components/WebcamCapture";
import { BoundingBoxOverlay } from "./components/BoundingBoxOverlay";
import { DetectionResult } from "./components/DetectionResult";
import { HistoryList } from "./components/HistoryList";
import { usePrediction } from "./hooks/usePrediction";
import { useHistory } from "./hooks/useHistory";

type InputMode = "upload" | "webcam";

function App() {
  const [mode, setMode] = useState<InputMode>("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const { status, result, error, runPrediction, reset } = usePrediction();
  const { history, addEntry, clearHistory } = useHistory();

  // Successful detection হলে history-তে যোগ করো
  useEffect(() => {
    if (status === "success" && result) {
      addEntry(result);
    }
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

  function handleModeChange(newMode: InputMode) {
    setMode(newMode);
    handleReset();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">WasteVision AI</h1>

        {!previewUrl && (
          <>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleModeChange("upload")}
                className={`px-4 py-1.5 text-sm rounded-lg border ${
                  mode === "upload" ? "bg-gray-900 text-white" : "text-gray-600"
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => handleModeChange("webcam")}
                className={`px-4 py-1.5 text-sm rounded-lg border ${
                  mode === "webcam" ? "bg-gray-900 text-white" : "text-gray-600"
                }`}
              >
                Webcam
              </button>
            </div>

            {mode === "upload" && <ImageUpload onImageSelected={handleImageSelected} />}
            {mode === "webcam" && <WebcamCapture onCapture={handleImageSelected} />}
          </>
        )}

        {previewUrl && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <BoundingBoxOverlay
                imageUrl={previewUrl}
                box={result?.prediction?.bounding_box ?? null}
                label={result?.prediction?.object ?? null}
                naturalWidth={naturalSize.width}
                naturalHeight={naturalSize.height}
              />
              <img
                src={previewUrl}
                alt=""
                className="hidden"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
                }}
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleReset}
                  className="flex-1 border rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Reset
                </button>
                <button
                  onClick={() => imageFile && runPrediction(imageFile)}
                  disabled={status === "loading"}
                  className="flex-1 border rounded-lg py-2 text-sm text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50"
                >
                  {status === "loading" ? "Detecting..." : "Detect waste"}
                </button>
              </div>
            </div>

            <div>
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              {status === "success" && result && <DetectionResult result={result} />}
              {status === "idle" && (
                <p className="text-gray-400 text-sm">
                  Click "Detect waste" to identify this item.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8">
          <HistoryList history={history} onClear={clearHistory} />
        </div>
      </div>
    </div>
  );
}

export default App;
