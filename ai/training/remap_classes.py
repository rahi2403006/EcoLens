"""
Remaps the 42 fine-grained Roboflow classes into our 6 broad categories:
plastic, paper, metal, glass, organic, other.

Reads YOLO-format labels (class_id x_center y_center width height per line),
rewrites the class_id using our mapping, and copies images+labels into
ai/dataset/{images,labels}/{train,val,test}/ following our project structure.
"""

import shutil
from pathlib import Path
import yaml

RAW_DIR = Path("raw_dataset")
OUT_DIR = Path("..") / "dataset"

OUR_CLASSES = ["plastic", "paper", "metal", "glass", "organic", "other"]


CLASS_MAP = {
    "Aerosols": "other",
    "Aluminum can": "metal",
    "Aluminum caps": "metal",
    "Cardboard": "paper",
    "Cellulose": "paper",
    "Ceramic": "other",
    "Combined plastic": "plastic",
    "Container for household chemicals": "other",
    "Disposable tableware": "plastic",
    "Electronics": "other",
    "Foil": "metal",
    "Furniture": "other",
    "Glass bottle": "glass",
    "Iron utensils": "metal",
    "Liquid": "other",
    "Metal shavings": "metal",
    "Milk bottle": "plastic",
    "Organic": "organic",
    "Paper": "paper",
    "Paper bag": "paper",
    "Paper cups": "paper",
    "Paper shavings": "paper",
    "Papier mache": "paper",
    "Plastic bag": "plastic",
    "Plastic bottle": "plastic",
    "Plastic can": "plastic",
    "Plastic canister": "plastic",
    "Plastic caps": "plastic",
    "Plastic cup": "plastic",
    "Plastic shaker": "plastic",
    "Plastic shavings": "plastic",
    "Plastic toys": "plastic",
    "Postal packaging": "paper",
    "Printing industry": "paper",
    "Scrap metal": "metal",
    "Stretch film": "plastic",
    "Tetra pack": "paper",
    "Textile": "other",
    "Tin": "metal",
    "Unknown plastic": "plastic",
    "Wood": "other",
    "Zip plastic bag": "plastic",
}


def load_source_classes():
    with open(RAW_DIR / "data.yaml", "r") as f:
        data = yaml.safe_load(f)
    return data["names"]


def build_id_remap(source_classes):
    """old_id -> new_id, based on CLASS_MAP + OUR_CLASSES order."""
    remap = {}
    missing = []
    for old_id, name in enumerate(source_classes):
        if name not in CLASS_MAP:
            missing.append(name)
            continue
        new_name = CLASS_MAP[name]
        new_id = OUR_CLASSES.index(new_name)
        remap[old_id] = new_id
    if missing:
        raise ValueError(f"These source classes have no mapping in CLASS_MAP: {missing}")
    return remap


def process_split(split_name, out_split_name, id_remap):
    src_img_dir = RAW_DIR / split_name / "images"
    src_lbl_dir = RAW_DIR / split_name / "labels"
    out_img_dir = OUT_DIR / "images" / out_split_name
    out_lbl_dir = OUT_DIR / "labels" / out_split_name
    out_img_dir.mkdir(parents=True, exist_ok=True)
    out_lbl_dir.mkdir(parents=True, exist_ok=True)

    count = 0
    for label_file in src_lbl_dir.glob("*.txt"):
        new_lines = []
        with open(label_file, "r") as f:
            for line in f:
                parts = line.strip().split()
                if not parts:
                    continue
                old_id = int(parts[0])
                if old_id not in id_remap:
                    continue  
                new_id = id_remap[old_id]
                new_lines.append(" ".join([str(new_id)] + parts[1:]))

        if not new_lines:
            continue  # skip images with no valid labels after remap

        # copy matching image (try common extensions)
        img_stem = label_file.stem
        img_found = None
        for ext in [".jpg", ".jpeg", ".png"]:
            candidate = src_img_dir / f"{img_stem}{ext}"
            if candidate.exists():
                img_found = candidate
                break
        if img_found is None:
            continue

        shutil.copy(img_found, out_img_dir / img_found.name)
        with open(out_lbl_dir / label_file.name, "w") as f:
            f.write("\n".join(new_lines))
        count += 1

    print(f"{split_name} -> {out_split_name}: {count} images processed")


def main():
    source_classes = load_source_classes()
    print(f"Source has {len(source_classes)} classes")
    id_remap = build_id_remap(source_classes)
    print("Remap built successfully")

    process_split("train", "train", id_remap)
    process_split("valid", "val", id_remap)
    process_split("test", "test", id_remap)

    print("\nDone. Output written to:", OUT_DIR.resolve())


if __name__ == "__main__":
    main()