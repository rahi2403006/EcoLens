from ultralytics import YOLO

def main():
    model = YOLO("yolov8n.pt")  

    model.train(
        data="../dataset/data.yaml",
        epochs=50,
        imgsz=640,
        batch=16,
        device=0,          
        project="../training/runs",
        name="wastevision_v1",
        patience=10,        
        workers=4,
    )

if __name__ == "__main__":
    main()
