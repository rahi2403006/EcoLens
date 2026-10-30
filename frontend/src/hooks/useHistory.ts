import { useState, useEffect, useCallback } from "react";
import type { HistoryEntry, PredictionResponse } from "../types/prediction";

const STORAGE_KEY = "ecolens_history";
const MAX_ENTRIES = 20;

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // corrupted localStorage data হলে চুপচাপ খালি history দিয়ে শুরু করো
      setHistory([]);
    }
  }, []);

  const addEntry = useCallback((result: PredictionResponse) => {
    if (!result.prediction?.success || result.prediction.low_confidence || !result.recommendation) {
      return; // শুধু confident, successful detection history-তে রাখব
    }

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      object: result.prediction.object ?? "unknown",
      confidence: result.prediction.confidence ?? 0,
      category: result.recommendation.category,
      bin: result.recommendation.bin,
      timestamp: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return { history, addEntry, clearHistory };
}
