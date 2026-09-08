from typing import Optional
from pydantic import BaseModel


class BoundingBox(BaseModel):
    x1: int
    y1: int
    x2: int
    y2: int


class RawPrediction(BaseModel):
    """Raw output from the AI Inference layer only."""
    success: bool
    object: Optional[str] = None
    confidence: Optional[float] = None
    bounding_box: Optional[BoundingBox] = None
    low_confidence: bool = False
    message: Optional[str] = None


class Recommendation(BaseModel):
    category: str
    bin: str
    instruction: str


class PredictionResponse(BaseModel):
    """Final API response shape returned by POST /api/v1/predict"""
    success: bool
    prediction: Optional[RawPrediction] = None
    recommendation: Optional[Recommendation] = None
    message: Optional[str] = None
