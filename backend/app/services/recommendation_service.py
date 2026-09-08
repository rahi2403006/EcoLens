from typing import Optional
from app.schemas.prediction import Recommendation

RECOMMENDATION_MAP: dict[str, Recommendation] = {
    "plastic": Recommendation(
        category="recyclable",
        bin="Plastic Recycling Bin",
        instruction ="Empty and rinse the bottle before recycling"
    ),
    "paper": Recommendation(
        category="recyclable",
        bin="Paper Recycling Bin",
        instruction="Keep paper dry and free from food contamination.",
    ),
    "metal": Recommendation(
        category="recyclable",
        bin="Metal Recycling Bin",
        instruction="Clean containers before recycling.",
    ),
    "glass": Recommendation(
        category="recyclable",
        bin="Glass Recycling Bin",
        instruction="Handle broken glass carefully.",
    ),
    "organic": Recommendation(
        category="biodegradable",
        bin="Organic/Compost Bin",
        instruction="Place food and plant waste in the organic waste stream.",
    ),
    "other": Recommendation(
        category="general",
        bin="General Waste Bin",
        instruction="Dispose according to local waste-management guidance.",
    ),
}

def get_recommendation(label:str) -> Optional[Recommendation]:
    return RECOMMENDATION_MAP.get(label)
