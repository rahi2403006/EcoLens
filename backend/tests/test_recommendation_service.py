from app.services.recommendation_service import get_recommendation

ALL_CLASSES = ["plastic", "paper", "metal", "glass", "organic", "other"]


def test_all_six_classes_have_recommendations():
    for label in ALL_CLASSES:
        rec = get_recommendation(label)
        assert rec is not None, f"No recommendation found for '{label}'"
        assert rec.category
        assert rec.bin
        assert rec.instruction


def test_unknown_class_returns_none():
    assert get_recommendation("banana") is None


def test_recommendation_content_makes_sense():
    plastic_rec = get_recommendation("plastic")
    assert plastic_rec.category == "recyclable"

    organic_rec = get_recommendation("organic")
    assert organic_rec.category == "biodegradable"

    other_rec = get_recommendation("other")
    assert other_rec.category == "general"
