# CostAllocator Pro

Enterprise Financial Intelligence Platform for P&L Management, Cost Allocation, and AI-Powered Financial Analytics.

## Architecture

- **Frontend**: Next.js 15 + React 19 + TypeScript + TailwindCSS + shadcn/ui
- **Backend**: FastAPI + SQLAlchemy + Alembic + Pydantic
- **Database**: PostgreSQL + Redis
- **AI**: LangChain + Ollama + Prophet + XGBoost

## Project Structure

```
├── frontend/          # Next.js 15 application
├── backend/           # FastAPI application
├── docker-compose.yml # Local development setup
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 16+
- Redis 7+

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Development Phases

1. **Phase 1**: Infrastructure, Auth, RBAC, Core Layout
2. **Phase 2**: Data Integration (SAP, Salesforce, HRMS)
3. **Phase 3**: P&L Engine (Revenue, Cost, Profit)
4. **Phase 4**: CostAllocator Pro (Allocation Rules, AI)
5. **Phase 5**: Dashboards & Visualizations
6. **Phase 6**: Reports & AI Module

## Brand

Finmark.ai
