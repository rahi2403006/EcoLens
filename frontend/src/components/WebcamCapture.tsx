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

  return (
    <div className="border rounded-xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full ${isActive ? "block" : "hidden"}`}
      />

      {!isActive && (
        <div className="p-10 text-center bg-gray-50">
          <button
            onClick={start}
            className="border rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Start webcam
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      )}

      {isActive && (
        <div className="p-3 bg-white flex gap-2">
          <button
            onClick={stop}
            className="flex-1 border rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCapture}
            className="flex-1 border rounded-lg py-2 text-sm text-white bg-gray-900 hover:bg-gray-800"
          >
            Capture
          </button>
        </div>
      )}
    </div>
  );
}
