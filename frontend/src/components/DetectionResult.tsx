import type { PredictionResponse } from "../types/prediction";

interface DetectionResultProps {
  result: PredictionResponse;
}

const CATEGORY_COLORS: Record<string, string> = {
  recyclable: "bg-green-100 text-green-800",
  biodegradable: "bg-lime-100 text-lime-800",
  general: "bg-gray-200 text-gray-800",
};

export function DetectionResult({ result }: DetectionResultProps) {
  const { prediction, recommendation } = result;

  if (!prediction || !prediction.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{prediction?.message || "Prediction failed."}</p>
      </div>
    );
  }

  if (prediction.low_confidence) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 font-medium">
          Unable to confidently identify this object
        </p>
        <p className="text-amber-700 text-sm mt-1">{prediction.message}</p>
        <p className="text-amber-600 text-xs mt-2">
          Confidence: {((prediction.confidence ?? 0) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }

  const categoryClass = recommendation
    ? CATEGORY_COLORS[recommendation.category] ?? "bg-gray-200 text-gray-800"
    : "bg-gray-200 text-gray-800";

  return (
    <div className="space-y-3">
      <div className="bg-white border rounded-lg p-4">
        <p className="text-sm text-gray-500">Detected object</p>
        <p className="text-lg font-medium capitalize">{prediction.object}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${(prediction.confidence ?? 0) * 100}%` }}
            />
          </div>
          <span className="text-sm text-green-700 font-medium">
            {((prediction.confidence ?? 0) * 100).toFixed(1)}%
          </span>
        </div>
        {recommendation && (
          <span className={`inline-block mt-3 text-xs px-2 py-1 rounded ${categoryClass}`}>
            {recommendation.category}
          </span>
        )}
      </div>

      {recommendation && (
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">{recommendation.bin}</p>
          <p className="text-sm text-gray-800 mt-1">{recommendation.instruction}</p>
        </div>
      )}
    </div>
  );
}
