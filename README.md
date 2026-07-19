# CostAllocator Pro

Enterprise Financial Intelligence Platform by Finmark.ai

## Live

- **App:** https://costallocator-pro.vercel.app
- **API:** https://costallocator-api-3skb.onrender.com
- **Docs:** https://costallocator-api-3skb.onrender.com/docs

## Architecture

```
User → Next.js (Vercel) → FastAPI (Render) → PostgreSQL (Neon)
                                │
                                ├── P&L Engine
                                ├── Workforce Engine
                                ├── CostAllocator Pro
                                ├── Unit Economics Engine
                                ├── AI Services (Ollama/LangGraph)
                                ├── Report Engine
                                └── Notification Service
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| State | Zustand, React Query |
| Charts | Apache ECharts, AG Grid Community |
| Backend | FastAPI, SQLAlchemy 2, Pydantic, Celery |
| Database | PostgreSQL (Neon), ClickHouse, Redis, MinIO |
| AI | LangGraph, LangChain, Ollama, Prophet, Scikit-learn |
| ETL | Airbyte, dbt Core, Apache Airflow |
| Auth | Keycloak |
| Reports | ExcelJS, PDFKit, PptxGenJS |
| Monitoring | Grafana, Prometheus, Loki, Sentry |
| Deployment | Vercel, Render, Docker, GitHub Actions |

## Enterprise Workflow

1. **Data Ingestion** – REST APIs, Webhooks, CSV, Scheduled Sync from SAP/Salesforce/Tally/HRMS/Jira
2. **Validation & Transform** – Dedup, currency conversion, mapping
3. **Central Data Platform** – Master data + transactions
4. **Business Rules Engine** – Finance-configurable, no code required
5. **P&L Calculation Engine** – Revenue → Cost → Margins → Forecast
6. **Workforce Engine** – Allocation, utilization, bench, hiring
7. **CostAllocator Pro** – Shared cost allocation with drivers
8. **Unit Economics** – Per-employee, per-client, per-project metrics
9. **AI Intelligence** – Forecasting, pricing advisor, root cause analysis
10. **Alert Engine** – Threshold-based alerts to stakeholders
11. **Dashboards** – Executive, BU, Geography, Client, Project
12. **Reporting** – PPT, PDF, Excel, scheduled email delivery

## Run Locally

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## Scope

| Category | Count |
|----------|-------|
| Frontend pages | 70–80 |
| React components | 300+ |
| Backend APIs | ~220 |
| Database tables | 50–60 |
| AI agents | 6–8 |
| Integrations | 10–15 |

## Brand

Finmark.ai
