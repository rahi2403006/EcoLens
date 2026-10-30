# EcoLens

## Overview
EcoLens is an **AI‑powered waste identification and disposal recommendation system**. It combines a YOLO‑based computer‑vision model, a FastAPI backend for inference, and a modern React + TypeScript dashboard for visualising results and monitoring waste streams.

## Project Structure
```
.
├── ai
│   ├── dataset
│   │   └── data.yaml
│   └── training
│       ├── remap_classes.py
│       └── train.py
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── __init__.py
│   │   │   └── v1
│   │   ├── core
│   │   │   ├── config.py
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── schemas
│   │   │   ├── __init__.py
│   │   │   └── prediction.py
│   │   ├── services
│   │   │   ├── ai_service.py
│   │   │   ├── __init__.js
│   │   │   └── recommendation_service.py
│   │   └── utils
│   │       └── __init__.py
│   ├── models
│   │   ├── best
│   │   │   ├── byteorder
│   │   │   ├── .data
│   │   │   ├── data
│   │   │   ├── data.pkl
│   │   │   └── version
│   │   └── best.pt
│   ├── .python-version
│   ├── requirements.txt
│   └── tests
│       ├── __init__.py
│       ├── test_ai_service.py
│       ├── test_api.py
│       └── test_recommendation_service.py
├── frontend
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── .oxlintrc.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── favicon.svg
│   ├── README.md
│   └── src
│       ├── App.tsx
│       ├── assets
│       ├── components
│       │   ├── AlertToaster.tsx
│       │   ├── BinDetail.tsx
│       │   ├── BinList.tsx
│       │   ├── BinMap.tsx
│       │   ├── BoundingBoxOverlay.tsx
│       │   ├── BoxLayer.tsx
│       │   ├── ChartCard.tsx
│       │   ├── DetectionResult.tsx
│       │   ├── FillBar.tsx
│       │   ├── HistoryList.tsx
│       │   ├── ImageUpload.tsx
│       │   ├── layout
│       │   ├── LivePanel.tsx
│       │   ├── PagePlaceholder.tsx
│       │   ├── RecordBadge.tsx
│       │   ├── Sidebar.tsx
│       │   ├── StatCards.tsx
│       │   ├── StatCard.tsx
│       │   ├── StatusBadge.tsx
│       │   ├── Switch.tsx
│       │   └── WebcamCapture.tsx
│       ├── context
│       │   ├── monitoringContext.ts
│       │   ├── MonitoringProvider.tsx
│       │   ├── toastContext.ts
│       │   └── ToastProvider.tsx
│       ├── data
│       │   ├── advice.ts
│       │   └── seed.ts
│       ├── hooks
│       │   ├── useBackendStatus.ts
│       │   ├── useHistory.ts
│       │   ├── useLive.ts
│       │   ├── useMonitoring.ts
│       │   ├── usePrediction.ts
│       │   ├── useTheme.ts
│       │   ├── useToast.ts
│       │   └── useWebcam.ts
│       ├── index.css
│       ├── lib
│       │   ├── binStatus.ts
│       │   ├── format.ts
│       │   └── monitoringReducer.ts
│       ├── main.tsx
│       ├── pages
│       │   ├── About.tsx
│       │   ├── Alerts.tsx
│       │   ├── Analytics.tsx
│       │   ├── Bins.tsx
│       │   ├── Collections.tsx
│       │   └── Detect.tsx
│       ├── services
│       │   └── api.ts
│       ├── styles
│       │   └── tokens.css
│       ├── types
│       │   ├── monitoring.ts
│       │   └── prediction.ts
│       ├── utils
│       └── views
│           ├── AboutView.tsx
│           ├── AnalyticsView.tsx
│           └── HistoryView.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```
> **Note**: The `esp32/` directory is planned for future firmware integration and is not yet part of the repository.

## Features
- Real‑time image classification of waste items.
- Recommendations for proper disposal (recyclable, compost, landfill, etc.).
- Extensible architecture: separate AI training pipeline, inference API, and user interface.
- Future support for ESP32‑CAM edge devices.

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/ecolens.git
   cd ecolens
   ```
2. **Backend (FastAPI + YOLO inference)**
   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. **Frontend (React + TypeScript)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **AI training pipeline**
   ```bash
   cd ../ai
   # Follow the instructions in ai/README.md for dataset preparation and model training.
   ```

## Documentation
- Architecture details: `docs/architecture.md`
- Backend API reference: `backend/docs/api.md`
- AI module guide: `ai/README.md`
- Contribution guide: `CONTRIBUTING.md`

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code style, testing, and pull‑request workflow.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.


## Overview
EcoLens is an **AI‑powered waste identification and disposal recommendation system**. It combines a YOLO‑based computer‑vision model, a FastAPI backend for inference, and a modern React + TypeScript dashboard for visualising results and monitoring waste streams.

## Project Structure
```
.
├── ai
│   ├── dataset
│   │   └── data.yaml
│   └── training
│       ├── remap_classes.py
│       └── train.py
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── __init__.py
│   │   │   └── v1
│   │   ├── core
│   │   │   ├── config.py
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── schemas
│   │   │   ├── __init__.py
│   │   │   └── prediction.py
│   │   ├── services
│   │   │   ├── ai_service.py
│   │   │   ├── __init__.py
│   │   │   └── recommendation_service.py
│   │   └── utils
│   │       └── __init__.py
│   ├── models
│   │   ├── best
│   │   │   ├── byteorder
│   │   │   ├── .data
│   │   │   ├── data
│   │   │   ├── data.pkl
│   │   │   └── version
│   │   └── best.pt
│   ├── .python-version
│   ├── requirements.txt
│   └── tests
│       ├── __init__.py
│       ├── test_ai_service.py
│       ├── test_api.py
│       └── test_recommendation_service.py
├── frontend
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── .oxlintrc.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── favicon.svg
│   ├── README.md
│   └── src
│       ├── App.tsx
│       ├── assets
│       ├── components
│       │   ├── AlertToaster.tsx
│       │   ├── BinDetail.tsx
│       │   ├── BinList.tsx
│       │   ├── BinMap.tsx
│       │   ├── BoundingBoxOverlay.tsx
│       │   ├── BoxLayer.tsx
│       │   ├── ChartCard.tsx
│       │   ├── DetectionResult.tsx
│       │   ├── FillBar.tsx
│       │   ├── HistoryList.tsx
│       │   ├── ImageUpload.tsx
│       │   ├── layout
│       │   ├── LivePanel.tsx
│       │   ├── PagePlaceholder.tsx
│       │   ├── RecordBadge.tsx
│       │   ├── Sidebar.tsx
│       │   ├── StatCards.tsx
│       │   ├── StatCard.tsx
│       │   ├── StatusBadge.tsx
│       │   ├── Switch.tsx
│       │   └── WebcamCapture.tsx
│       ├── context
│       │   ├── monitoringContext.ts
│       │   ├── MonitoringProvider.tsx
│       │   ├── toastContext.ts
│       │   └── ToastProvider.tsx
│       ├── data
│       │   ├── advice.ts
│       │   └── seed.ts
│       ├── hooks
│       │   ├── useBackendStatus.ts
│       │   ├── useHistory.ts
│       │   ├── useLive.ts
│       │   ├── useMonitoring.ts
│       │   ├── usePrediction.ts
│       │   ├── useTheme.ts
│       │   ├── useToast.ts
│       │   └── useWebcam.ts
│       ├── index.css
│       ├── lib
│       │   ├── binStatus.ts
│       │   ├── format.ts
│       │   └── monitoringReducer.ts
│       ├── main.tsx
│       ├── pages
│       │   ├── About.tsx
│       │   ├── Alerts.tsx
│       │   ├── Analytics.tsx
│       │   ├── Bins.tsx
│       │   ├── Collections.tsx
│       │   └── Detect.tsx
│       ├── services
│       │   └── api.ts
│       ├── styles
│       │   └── tokens.css
│       ├── types
│       │   ├── monitoring.ts
│       │   └── prediction.ts
│       ├── utils
│       └── views
│           ├── AboutView.tsx
│           ├── AnalyticsView.tsx
│           └── HistoryView.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```
> **Note**: The `esp32/` directory is planned for future firmware integration and is not yet part of the repository.

## Features
- Real‑time image classification of waste items.
- Recommendations for proper disposal (recyclable, compost, landfill, etc.).
- Extensible architecture: separate AI training pipeline, inference API, and user interface.
- Future support for ESP32‑CAM edge devices.

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/ecolens.git
   cd ecolens
   ```
2. **Backend (FastAPI + YOLO inference)**
   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. **Frontend (React + TypeScript)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **AI training pipeline**
   ```bash
   cd ../ai
   # Follow the instructions in ai/README.md for dataset preparation and model training.
   ```

## Documentation
- Architecture details: `docs/architecture.md`
- Backend API reference: `backend/docs/api.md`
- AI module guide: `ai/README.md`
- Contribution guide: `CONTRIBUTING.md`

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code style, testing, and pull‑request workflow.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.


## Overview
EcoLens is an **AI‑powered waste identification and disposal recommendation system**. It combines a YOLO‑based computer‑vision model, a FastAPI backend for inference, and a modern React + TypeScript dashboard for visualising results and monitoring waste streams.

## Project Structure
```
.
├── ai
│   ├── dataset
│   │   └── data.yaml
│   └── training
│       ├── remap_classes.py
│       └── train.py
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── __init__.py
│   │   │   └── v1
│   │   ├── core
│   │   │   ├── config.py
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── schemas
│   │   │   ├── __init__.py
│   │   │   └── prediction.py
│   │   ├── services
│   │   │   ├── ai_service.py
│   │   │   ├── __init__.py
│   │   │   └── recommendation_service.py
│   │   └── utils
│   │       └── __init__.py
│   ├── models
│   │   ├── best
│   │   │   ├── byteorder
│   │   │   ├── .data
│   │   │   ├── data
│   │   │   ├── data.pkl
│   │   │   └── version
│   │   └── best.pt
│   ├── .python-version
│   ├── requirements.txt
│   └── tests
│       ├── __init__.py
│       ├── test_ai_service.py
│       ├── test_api.py
│       └── test_recommendation_service.py
├── frontend
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── .oxlintrc.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── favicon.svg
│   ├── README.md
│   └── src
│       ├── App.tsx
│       ├── assets
│       ├── components
│       │   ├── AlertToaster.tsx
│       │   ├── BinDetail.tsx
│       │   ├── BinList.tsx
│       │   ├── BinMap.tsx
│       │   ├── BoundingBoxOverlay.tsx
│       │   ├── BoxLayer.tsx
│       │   ├── ChartCard.tsx
│       │   ├── DetectionResult.tsx
│       │   ├── FillBar.tsx
│       │   ├── HistoryList.tsx
│       │   ├── ImageUpload.tsx
│       │   ├── layout
│       │   ├── LivePanel.tsx
│       │   ├── PagePlaceholder.tsx
│       │   ├── RecordBadge.tsx
│       │   ├── Sidebar.tsx
│       │   ├── StatCards.tsx
│       │   ├── StatCard.tsx
│       │   ├── StatusBadge.tsx
│       │   ├── Switch.tsx
│       │   └── WebcamCapture.tsx
│       ├── context
│       │   ├── monitoringContext.ts
│       │   ├── MonitoringProvider.tsx
│       │   ├── toastContext.ts
│       │   └── ToastProvider.tsx
│       �li   ├── data
│       │   ├── advice.ts
│       │   └── seed.ts
│       ├── hooks
│       │   ├── useBackendStatus.ts
│       │   ├── useHistory.ts
│       │   ├── useLive.ts
│       │   ├── useMonitoring.ts
│       │   ├── usePrediction.ts
│       │   ├── useTheme.ts
│       │   ├── useToast.ts
│       │   └── useWebcam.ts
│       ├── index.css
│       ├── lib
│       │   ├── binStatus.ts
│       │   ├── format.ts
│       │   └── monitoringReducer.ts
│       ├── main.tsx
│       ├── pages
│       │   ├── About.tsx
│       │   ├── Alerts.tsx
│       │   ├── Analytics.tsx
│       │   ├── Bins.tsx
│       │   ├── Collections.tsx
│       │   └── Detect.tsx
│       ├── services
│       │   └── api.ts
│       ├── styles
│       │   └── tokens.css
│       ├── types
│       │   ├── monitoring.ts
│       │   └── prediction.ts
│       ├── utils
│       └── views
│           ├── AboutView.tsx
│           ├── AnalyticsView.tsx
│           └── HistoryView.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```
> **Note**: The `esp32/` directory is planned for future firmware integration and is not yet part of the repository.

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/ecolens.git
   cd ecolens
   ```
2. **Backend (FastAPI + YOLO inference)**
   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. **Frontend (React + TypeScript)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **AI training pipeline**
   ```bash
   cd ../ai
   # Follow the instructions in ai/README.md for dataset preparation and model training.
   ```

## Documentation
- Architecture details: `docs/architecture.md`
- Backend API reference: `backend/docs/api.md`
- AI module guide: `ai/README.md`
- Contribution guide: `CONTRIBUTING.md`

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code style, testing, and pull‑request workflow.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.


## Overview
EcoLens is an *AI‑powered waste identification and disposal recommendation system*. It combines computer‑vision models (YOLO) with a FastAPI backend and a modern React/TypeScript dashboard to help users quickly sort and manage waste.

## Features
- Real‑time image classification of waste items.
- Recommendations for proper disposal (recyclable, compost, landfill, etc.).
- Extensible architecture: separate AI training pipeline, inference API, and user interface.
- Future support for ESP32‑CAM edge devices.

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/ecolens.git
   cd ecolens
   ```
2. **Backend (FastAPI + YOLO inference)**
   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. **Frontend (React + TypeScript)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **AI training pipeline**
   ```bash
   cd ../ai
   # Follow the instructions in ai/README.md for dataset preparation and model training.
   ## Project Structure

```
.
├── ai
│   ├── dataset
│   │   └── data.yaml
│   └── training
│       ├── remap_classes.py
│       └── train.py
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── __init__.py
│   │   │   └── v1
│   │   ├── core
│   │   │   ├── config.py
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── schemas
│   │   │   ├── __init__.py
│   │   │   └── prediction.py
│   │   ├── services
│   │   │   ├── ai_service.py
│   │   │   ├── __init__.py
│   │   │   └── recommendation_service.py
│   │   └── utils
│   │       └── __init__.py
│   ├── models
│   │   ├── best
│   │   │   ├── byteorder
│   │   │   ├── .data
│   │   │   ├── data
│   │   │   ├── data.pkl
│   │   │   └── version
│   │   └── best.pt
│   ├── .python-version
│   ├── requirements.txt
│   └── tests
│       ├── __init__.py
│       ├── test_ai_service.py
│       ├── test_api.py
│       └── test_recommendation_service.py
├── frontend
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── .oxlintrc.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── favicon.svg
│   ├── README.md
│   ├── src
│   │   ├── App.tsx
│   │   ├── assets
│   │   ├── components
│   │   │   ├── AlertToaster.tsx
│   │   │   ├── BinDetail.tsx
│   │   │   ├── BinList.tsx
│   │   │   ├── BinMap.tsx
│   │   │   ├── BoundingBoxOverlay.tsx
│   │   │   ├── BoxLayer.tsx
│   │   │   ├── ChartCard.tsx
│   │   │   ├── DetectionResult.tsx
│   │   │   ├── FillBar.tsx
│   │   │   ├── HistoryList.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── layout
│   │   │   ├── LivePanel.tsx
│   │   │   ├── PagePlaceholder.tsx
│   │   │   ├── RecordBadge.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatCards.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── Switch.tsx
│   │   │   └── WebcamCapture.tsx
│   │   ├── context
│   │   │   ├── monitoringContext.ts
│   │   │   ├── MonitoringProvider.tsx
│   │   │   ├── toastContext.ts
│   │   │   └── ToastProvider.tsx
│   │   ├── data
│   │   │   ├── advice.ts
│   │   │   └── seed.ts
│   │   ├── hooks
│   │   │   ├── useBackendStatus.ts
│   │   │   ├── useHistory.ts
│   │   │   ├── useLive.ts
│   │   │   ├── useMonitoring.ts
│   │   │   ├── usePrediction.ts
│   │   │   ├── useTheme.ts
│   │   │   ├── useToast.ts
│   │   │   └── useWebcam.ts
│   │   ├── index.css
│   │   ├── lib
│   │   │   ├── binStatus.ts
│   │   │   ├── format.ts
│   │   │   └── monitoringReducer.ts
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── About.tsx
│   │   │   ├── Alerts.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── Bins.tsx
│   │   │   ├── Collections.tsx
│   │   │   └── Detect.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   ├── styles
│   │   │   └── tokens.css
│   │   ├── types
│   │   │   ├── monitoring.ts
│   │   │   └── prediction.ts
│   │   ├── utils
│   │   └── views
│   │       ├── AboutView.tsx
│   │       ├── AnalyticsView.tsx
│   │       └── HistoryView.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

> **Note**: The `esp32/` directory is planned for future firmware integration and is not yet part of the repository.

## Documentation
- Architecture details: `docs/architecture.md`
- Backend API reference: `backend/docs/api.md`
- AI module guide: `ai/README.md`
- Contribution guide: `CONTRIBUTING.md`

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code style, testing, and pull‑request workflow.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.


## Overview
EcoLens is an *AI‑powered waste identification and disposal recommendation system*. It combines computer‑vision models (YOLO) with a FastAPI backend and a modern React/TypeScript dashboard to help users quickly sort and manage waste.

## Features
- Real‑time image classification of waste items.
- Recommendations for proper disposal (recyclable, compost, landfill, etc.).
- Extensible architecture: separate AI training pipeline, inference API, and user interface.
- Future support for ESP32‑CAM edge devices.

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/ecolens.git
   cd ecolens
   ```
2. **Backend (FastAPI + YOLO inference)**
   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. **Frontend (React + TypeScript)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **AI training pipeline**
   ```bash
   cd ../ai
   # Follow the instructions in ai/README.md for dataset preparation and model training.
   ```

## Project Structure
```
EcoLens/
├─ ai/                # Dataset, training scripts, model checkpoints
│   ├─ data/          # Raw and processed data
│   ├─ scripts/       # Training and evaluation scripts
│   ├─ models/        # Saved model files
│   ├─ requirements.txt
│   └─ README.md      # AI module documentation
├─ backend/           # FastAPI service exposing /predict endpoint
│   ├─ main.py        # Application entry point
│   ├─ requirements.txt
│   ├─ Dockerfile
│   └─ docs/
│       └─ api.md    # Backend API documentation
├─ frontend/          # React dashboard UI
│   ├─ src/
│   │   ├─ main.tsx
│   │   └─ App.tsx
│   ├─ public/
│   │   └─ index.html
│   ├─ package.json
│   ├─ tsconfig.json
│   └─ vite.config.ts
├─ docs/              # Architecture diagrams and design docs
│   └─ architecture.md
├─ .gitignore
├─ CONTRIBUTING.md    # Contribution guidelines
├─ LICENSE            # MIT License
└─ README.md          # (this file) – project overview
```

> **Note**: The `esp32/` directory is planned for future firmware integration and is not yet part of the repository.

## Documentation
- Architecture details: `docs/architecture.md`
- Backend API reference: `backend/docs/api.md`
- AI module guide: `ai/README.md`
- Contribution guide: `CONTRIBUTING.md`

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code style, testing, and pull‑request workflow.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.


## Overview
EcoLens is an *AI‑powered waste identification and disposal recommendation system*. It combines computer‑vision models (YOLO) with a FastAPI backend and a modern React/TypeScript dashboard to help users quickly sort and manage waste.

## Features
- Real‑time image classification of waste items.
- Recommendations for proper disposal (recyclable, compost, landfill, etc.).
- Extensible architecture: separate AI training pipeline, inference API, and user interface.
- Future support for ESP32‑CAM edge devices.

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/ecolens.git
   cd ecolens
   ```
2. **Backend (FastAPI + YOLO inference)**
   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. **Frontend (React + TypeScript)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **AI training pipeline**
   ```bash
   cd ../ai
   # Follow the instructions in ai/README.md for dataset preparation and model training.
   ```

## Project Structure
```
EcoLens/
├─ ai/                # Dataset, training scripts, model checkpoints
│   ├─ data/          # Raw and processed data
│   ├─ scripts/       # Training and evaluation scripts
│   ├─ models/        # Saved model files
│   ├─ requirements.txt
│   └─ README.md      # AI module documentation
├─ backend/           # FastAPI service exposing /predict endpoint
│   ├─ main.py        # Application entry point
│   ├─ requirements.txt
│   ├─ Dockerfile
│   └─ docs/
│       └─ api.md    # Backend API documentation
├─ frontend/          # React dashboard UI
│   ├─ src/
│   │   ├─ main.tsx
│   │   └─ App.tsx
│   ├─ public/
│   │   └─ index.html
│   ├─ package.json
│   ├─ tsconfig.json
│   └─ vite.config.ts
├─ docs/              # Architecture diagrams and design docs
│   └─ architecture.md
├─ .gitignore
├─ CONTRIBUTING.md    # Contribution guidelines
├─ LICENSE            # MIT License
└─ README.md          # (this file) – project overview
```

> **Note**: The `esp32/` directory is planned for future firmware integration and is not yet part of the repository.

## Documentation
- Architecture details: `docs/architecture.md`
- Backend API reference: `backend/docs/api.md`
- AI module guide: `ai/README.md`
- Contribution guide: `CONTRIBUTING.md`

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code style, testing, and pull‑request workflow.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.


## Overview
EcoLens is an *AI‑powered waste identification and disposal recommendation system*. It combines computer‑vision models (YOLO) with a FastAPI backend and a modern React/TypeScript dashboard to help users quickly sort and manage waste.

## Features
- Real‑time image classification of waste items.
- Recommendations for proper disposal (recyclable, compost, landfill, etc.).
- Extensible architecture: separate AI training pipeline, inference API, and user interface.
- Future support for ESP32‑CAM edge devices.

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/ecolens.git
   cd ecolens
   ```
2. **Backend (FastAPI + YOLO inference)**
   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
3. **Frontend (React + TypeScript)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. **AI training pipeline**
   ```bash
   cd ../ai
   # Follow the instructions in ai/README.md for dataset preparation and model training.
   ```

## Project Structure
```
EcoLens/
├─ ai/            # Dataset, training scripts, model checkpoints
├─ backend/       # FastAPI service exposing /predict endpoint
├─ frontend/      # React dashboard UI
├─ docs/          # Architecture diagrams, design docs
├─ README.md      # **(this file)** – project overview
└─ .gitignore
```

> **Note**: The `esp32/` directory is planned for future firmware integration and is not yet part of the repository.

## Documentation
- Architecture details: `docs/architecture.md`
- Backend API: `backend/docs/api.md`
- AI model training: `ai/README.md`

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code style, testing, and pull‑request workflow.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.
