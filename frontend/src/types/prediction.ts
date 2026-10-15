export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface RawPrediction {
  success: boolean;
  object: string | null;
  confidence: number | null;
  bounding_box: BoundingBox | null;
  low_confidence: boolean;
  message: string | null;
}

export interface Recommendation {
  category: string;
  bin: string;
  instruction: string;
}

export interface PredictionResponse {
  success: boolean;
  prediction: RawPrediction | null;
  recommendation: Recommendation | null;
  message: string | null;
}

export interface HistoryEntry {
  id: string;
  object: string;
  confidence: number;
  category: string;
  bin: string;
  timestamp: string;
}
