import type { PredictionResponse } from "../types/prediction";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export async function predictWaste(imageFile: File | Blob): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

export async function fetchRecommendations(): Promise<Record<string, { category: string; bin: string; instruction: string }> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
