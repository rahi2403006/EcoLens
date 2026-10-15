import cv2
import numpy as np
from ultralytics import YOLO

from app.core.config import settings
from app.schemas.prediction import RawPrediction, BoundingBox


class AIService:
    def __init__(self):
        self.model = YOLO(settings.MODEL_PATH)
        self.classes = settings.CLASSES
        self.threshold = settings.CONFIDENCE_THRESHOLD
        self.device = settings.DEVICE

    def predict(self, image_bytes: bytes) -> RawPrediction:
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return RawPrediction(success=False, message="Invalid or corrupted image.")

        results = self.model.predict(source=img, device=self.device, verbose=False)
        result = results[0]

        if len(result.boxes) == 0:
            return RawPrediction(success=False, message="No object detected in image.")

        confidences = result.boxes.conf.cpu().numpy()
        best_idx = int(confidences.argmax())
        best_box = result.boxes[best_idx]

        cls_id = int(best_box.cls[0])
        conf = float(best_box.conf[0])
        xyxy = best_box.xyxy[0].cpu().numpy()

        bbox = BoundingBox(
            x1=int(xyxy[0]), y1=int(xyxy[1]),
            x2=int(xyxy[2]), y2=int(xyxy[3]),
        )
        label = self.classes[cls_id]

        if conf < self.threshold:
            return RawPrediction(
                success=True,
                object=label,
                confidence=round(conf, 4),
                bounding_box=bbox,
                low_confidence=True,
                message=(
                    "Unable to confidently identify this object. "
                    "Please try again with better lighting or place the object closer to the camera."
                ),
            )

        return RawPrediction(
            success=True,
            object=label,
            confidence=round(conf, 4),
            bounding_box=bbox,
            low_confidence=False,
        )


ai_service = AIService()
