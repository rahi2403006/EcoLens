"""
Central configuration. Values can be overridden via environment variables,
so nothing here is hard-coded into the services that use it.
"""

import os
from pathlib import Path

# backend/ folder ধরে model path বের করা হচ্ছে, hardcoded absolute path না
BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings:
    MODEL_PATH: str = os.getenv("MODEL_PATH", str(BACKEND_DIR / "models" / "best.pt"))
    CONFIDENCE_THRESHOLD: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.85"))
    CLASSES: list[str] = ["plastic", "paper", "metal", "glass", "organic", "other"]
    DEVICE: str = os.getenv("YOLO_DEVICE", "0")  # "0" = first GPU, "cpu" = CPU fallback


settings = Settings()
