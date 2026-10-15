from pathlib import Path
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

TEST_IMAGES_DIR = Path(__file__).resolve().parents[2] / "ai" / "dataset" / "images" / "test"


def _get_sample_image_path():
    return next(TEST_IMAGES_DIR.glob("*"))


def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_categories_endpoint():
    response = client.get("/api/v1/categories")
    assert response.status_code == 200
    categories = response.json()["categories"]
    assert set(categories) == {"plastic", "paper", "metal", "glass", "organic", "other"}


def test_recommendations_endpoint():
    response = client.get("/api/v1/recommendations")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 6
    for label, rec in data.items():
        assert "category" in rec
        assert "bin" in rec
        assert "instruction" in rec


def test_predict_with_valid_image():
    image_path = _get_sample_image_path()
    with open(image_path, "rb") as f:
        response = client.post(
            "/api/v1/predict",
            files={"file": (image_path.name, f, "image/jpeg")},
        )
    assert response.status_code == 200
    data = response.json()
    assert "success" in data
    assert "prediction" in data


def test_predict_with_missing_file_returns_422():
    response = client.post("/api/v1/predict")
    assert response.status_code == 422  # FastAPI validation error


def test_predict_with_wrong_content_type_returns_400():
    response = client.post(
        "/api/v1/predict",
        files={"file": ("test.txt", b"not an image", "text/plain")},
    )
    assert response.status_code == 400


def test_predict_with_empty_file_returns_400():
    response = client.post(
        "/api/v1/predict",
        files={"file": ("empty.jpg", b"", "image/jpeg")},
    )
    assert response.status_code == 400
