from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.ai_service import ai_service
from app.services.recommendation_service import get_recommendation
from app.schemas.prediction import PredictionResponse

router = APIRouter()

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/jpg"}
MAX_FILE_SIZE_MB = 10
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024


@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Use JPEG or PNG.",
        )

    image_bytes = await file.read()
    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    if len(image_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max size is {MAX_FILE_SIZE_MB}MB.",
        )

    raw_prediction = ai_service.predict(image_bytes)

    if not raw_prediction.success:
        return PredictionResponse(
            success=False,
            prediction=raw_prediction,
            message=raw_prediction.message or "Prediction failed.",
        )

    if not raw_prediction.low_confidence:
        recommendation = get_recommendation(raw_prediction.object)

    return PredictionResponse(
        success=True,
        prediction=raw_prediction,
        recommendation=recommendation,
    )
