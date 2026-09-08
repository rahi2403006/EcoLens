from ultralytics import YOLO

def main():
    model = YOLO("yolov8n.pt")  # pretrained COCO weights দিয়ে শুরু (transfer learning)

    model.train(
        data="../dataset/data.yaml",
        epochs=50,
        imgsz=640,
        batch=16,
        device=0,          # GPU 0 ব্যবহার করবে
        project="../training/runs",
        name="wastevision_v1",
        patience=10,        # 10 epoch improvement না হলে early stop
        workers=4,
    )

if __name__ == "__main__":
    main()
