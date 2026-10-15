from pathlib import Path
from app.services.ai_service import ai_service

TEST_IMAGES_DIR = Path(__file__).resolve().parents[2] / "ai" / "dataset" / "images" / "test"


def _get_sample_image_bytes():
    sample = next(TEST_IMAGES_DIR.glob("*"))
    return sample.read_bytes()


def test_valid_image_returns_success():
    image_bytes = _get_sample_image_bytes()
    result = ai_service.predict(image_bytes)
    assert result.success is True
    assert result.object in ["plastic", "paper", "metal", "glass", "organic", "other"]
    assert 0.0 <= result.confidence <= 1.0


def test_invalid_image_bytes_returns_failure():
    result = ai_service.predict(b"not a real image")
    assert result.success is False
    assert result.message is not None


def test_bounding_box_present_on_success():
    image_bytes = _get_sample_image_bytes()
    result = ai_service.predict(image_bytes)
    if result.success:
        assert result.bounding_box is not None
        assert result.bounding_box.x2 > result.bounding_box.x1
        assert result.bounding_box.y2 > result.bounding_box.y1


def test_low_confidence_flag_consistent_with_threshold():
    image_bytes = _get_sample_image_bytes()
    result = ai_service.predict(image_bytes)
    if result.success and result.confidence is not None:
        from app.core.config import settings
        expected_low = result.confidence < settings.CONFIDENCE_THRESHOLD
        assert result.low_confidence == expected_low
