import type { PredictionResponse } from "../types/prediction";

const CATEGORY_STYLE: Record<string, string> = {
  recyclable: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  biodegradable: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  general: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

const card = "rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900";

export function DetectionResult({ result }: { result: PredictionResponse }) {
  const { prediction, recommendation } = result;

  if (!prediction || !prediction.success) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
        <p className="text-red-700 dark:text-red-300">{prediction?.message || result.message || "Prediction failed."}</p>
      </div>
    );
  }

  const pct = (prediction.confidence ?? 0) * 100;

  if (prediction.low_confidence) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
        <p className="font-medium text-amber-800 dark:text-amber-200">Unable to confidently identify this object</p>
        <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">{prediction.message}</p>
        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">Confidence: {pct.toFixed(1)}%</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className={card}>
        <p className="text-sm text-slate-500 dark:text-slate-400">Detected object</p>
        <p className="text-lg font-medium capitalize">{prediction.object}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{pct.toFixed(1)}%</span>
        </div>
        {recommendation && (
          <span className={`mt-3 inline-block rounded px-2 py-1 text-xs ${CATEGORY_STYLE[recommendation.category] ?? CATEGORY_STYLE.general}`}>
            {recommendation.category}
          </span>
        )}
      </div>

      {recommendation && (
        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-400">{recommendation.bin}</p>
          <p className="mt-1 text-sm">{recommendation.instruction}</p>
        </div>
      )}
    </div>
  );
}
