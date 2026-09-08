"""Quick manual sanity check for ai_service. Run from backend/ folder."""

from pathlib import Path
from app.services.ai_service import ai_service

# dataset এর test split থেকে একটা ছবি নিচ্ছি
test_images_dir = Path("../ai/dataset/images/test")
sample_image = next(test_images_dir.glob("*"))

print(f"Testing with: {sample_image.name}")

with open(sample_image, "rb") as f:
    image_bytes = f.read()

result = ai_service.predict(image_bytes)
print(result.model_dump_json(indent=2))
