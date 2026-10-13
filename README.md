# FotoOwl Invitation

Wedding invitation portal with a white Next.js frontend and a Python FastAPI backend.

Guests open a shareable link (`/invite/[slug]`). Hosts fill one form to create the invitation (date, location, venue, video, message, and custom fields), then add more details anytime from the manage page.

## Stack

- **Frontend:** Next.js 16 (React) + TypeScript + Tailwind — white theme
- **Backend:** Python FastAPI + SQLAlchemy + SQLite

## Prerequisites

Already expected on your machine:

- Node.js 18+ and npm
- Python 3.11+ and pip
- Git

## Setup

### Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python run.py
```

API runs at [http://localhost:8000](http://localhost:8000) · docs at [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

```bash
cd frontend
cp .env.local.example .env.local   # already created locally
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

Run backend and frontend in two terminals.

## Project layout

```
backend/          FastAPI API + SQLite
frontend/         Next.js portal + invitation pages
```

## Main flows

1. Open the portal → fill the invitation form → get a link `/invite/{slug}`
2. Open `/manage/{slug}` → add extra information anytime (same form pattern)
3. Share the invite link with guests
