from fastapi import APIRouter
from app.core.config import settings
from app.services.recommendation_service import RECOMMENDATION_MAP

router = APIRouter()


@router.get("/categories")
def get_categories():
    return {"categories": settings.CLASSES}


@router.get("/recommendations")
def get_recommendations():
    return {label: rec.model_dump() for label, rec in RECOMMENDATION_MAP.items()}
