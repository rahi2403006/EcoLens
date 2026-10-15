"""
Central configuration. Values can be overridden via environment variables,
so nothing here is hard-coded into the services that use it.
"""

import os
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings:
    MODEL_PATH: str = os.getenv("MODEL_PATH", str(BACKEND_DIR / "models" / "best.pt"))
    CONFIDENCE_THRESHOLD: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.6"))
    CLASSES: list[str] = ["plastic", "paper", "metal", "glass", "organic", "other"]
    DEVICE: str = os.getenv("YOLO_DEVICE", "0")


settings = Settings()
