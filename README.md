# AI-Driven Multi-Modal Rural Logistics & Disaster Management Platform
**Mini Project (22CSP57) | Dept. of Computer Science & Engineering, NCET**

An intelligent, risk-aware multi-modal logistics orchestration platform designed for rural connectivity, border settlements, and emergency disaster relief operations.

---

## Live System Links
- **Interactive Web Dashboard**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API Server**: [http://localhost:5050/](http://localhost:5050/)
- **System Health & Objectives Check**: [http://localhost:5050/health](http://localhost:5050/health)
- **Case-Study Corridors API (Obj 06)**: [http://localhost:5050/api/corridors](http://localhost:5050/api/corridors)
- **Multi-Modal Transport Modes API (Obj 01)**: [http://localhost:5050/api/multimodal/modes](http://localhost:5050/api/multimodal/modes)
- **Village Registry & Border Outposts (Obj 03)**: [http://localhost:5050/api/villages](http://localhost:5050/api/villages)

---

## Implementation of Core Objectives (22CSP57)

| Objective | Feature Implementation | Visual & Interactive Capability |
| :--- | :--- | :--- |
| **01. Unified Data Model** | Seamless data schema combining **Road, Rail, Waterway & Air/Drone** logistics. | Interactive Multimodal comparison cards with speed, capacity, cost/km, and carbon metrics. Visual Ops Center HUD. |
| **02. ML Disruption Risk Model** | Multi-factor predictive model combining terrain elevation, live precipitation, and historical incidents. | Interactive ML Risk Simulator with live rainfall, wind gust, and soil saturation sliders computing risk probability. |
| **03. Village Accessibility Scoring** | Dedicated scoring model for remote, tribal, and border settlements. | Settlement table with accessibility scores, seasonal isolation window (days/yr), and Border Post filter. |
| **04. AI Route & Mode Recommendation** | Dynamic decision engine auto-selecting optimal mode based on road disruption and urgency. | "⚡ Optimize All" button and automated drone/barge diversion recommendations when road passes are blocked. |
| **05. Agency Planner & Disaster Alerts** | Crisis command console for NDRF, SDMA, District Collectors, and relief teams. | "🚨 Disaster Management Mode" toggle with real-time SOS queue from isolated villages and emergency UAV air-drop missions. |
| **06. Contrasting Case-Study Corridors** | Empirical validation across distinct geographic and climatic region types. | Switchable case-study corridors: **Himalayan Mountain Pass**, **Brahmaputra Riverine Delta**, and **Thar Desert Frontier**. |

---

## Project Structure

```
ai-logistics-platform/
│
├── backend/
│   ├── server.js              # Express API server entrypoint (Port 5050)
│   ├── routes/
│   │   ├── corridors.js       # Case-study corridors in contrasting regions (Obj 06)
│   │   ├── multimodal.js      # Unified multimodal transport models & recommendation (Obj 01 & 04)
│   │   ├── risk.js            # ML disruption risk assessment endpoints (Obj 02)
│   │   ├── routing.js         # Dynamic route optimization & waypoints (Obj 04)
│   │   └── villages.js        # Village registry and accessibility scoring (Obj 03)
│   ├── controllers/           # Controllers placeholder
│   ├── services/              # External service connectors
│   ├── config/                # Environment configuration
│   └── .env                   # Environment variables
│
├── frontend/
│   ├── public/images/         # High-resolution dashboard visuals
│   │   ├── multimodal_ops.jpg # Multimodal transport network illustration
│   │   ├── disaster_relief.jpg# Satellite flood relief & emergency drone air-drop HUD
│   │   └── corridors_case_study.jpg # Himalayan vs Riverine Delta corridor comparison
│   ├── index.html             # Application entrypoint
│   └── src/
│       ├── components/
│       │   ├── MultimodalPanel.jsx   # Objective 01 & 04 Mode comparison & visual
│       │   ├── MLRiskSimulator.jsx   # Objective 02 Interactive ML risk engine
│       │   ├── DisasterModePanel.jsx # Objective 05 Disaster agency crisis HUD
│       │   ├── CaseStudySelector.jsx # Objective 06 Contrasting corridor switcher
│       │   ├── MapView.jsx           # Geospatial SVG terrain map & vehicle telemetry
│       │   ├── RiskPanel.jsx         # Localized village risk breakdown
│       │   ├── RoutePanel.jsx        # Active transit matrix & path optimizer
│       │   └── VillageTable.jsx      # Objective 03 Border settlements scoring
│       ├── pages/
│       │   └── Dashboard.jsx         # Central command center integrating all 6 objectives
│       ├── services/
│       │   └── api.js                # API client with full endpoint bindings
│       ├── App.jsx
│       └── main.jsx
│
├── ml-service/                 # ML model scripts and weights
├── data/                       # Spatial GIS datasets & weather logs
├── docs/                       # Architecture diagrams & project reports
└── README.md
```
