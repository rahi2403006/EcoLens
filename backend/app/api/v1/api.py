from fastapi import APIRouter
from app.api.v1.routes import health, categories, prediction

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(categories.router, tags=["categories"])
api_router.include_router(prediction.router, tags=["prediction"])
