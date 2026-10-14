from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from app.database import Base, engine
from app.routers import invitations

Base.metadata.create_all(bind=engine)

# Lightweight SQLite migration for existing local DBs
with engine.connect() as conn:
    columns = {col["name"] for col in inspect(conn).get_columns("invitations")}
    if "template_id" not in columns:
        conn.execute(
            text(
                "ALTER TABLE invitations "
                "ADD COLUMN template_id VARCHAR(40) NOT NULL DEFAULT 'classic'"
            )
        )
        conn.commit()

app = FastAPI(
    title="FotoOwl Invitation API",
    description="Wedding invitation portal backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(invitations.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
