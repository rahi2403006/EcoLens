import { useState } from "react";
import { predictWaste } from "../services/api";
import type { PredictionResponse } from "../types/prediction";

type Status = "idle" | "loading" | "success" | "error";

export function usePrediction() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runPrediction(image: File | Blob) {
    setStatus("loading");
    setError(null);
    try {
      const response = await predictWaste(image);
      setResult(response);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setResult(null);
    setError(null);
  }

  return { status, result, error, runPrediction, reset };
}
