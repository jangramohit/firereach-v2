import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import outreach_routes

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:%(name)s:%(message)s"
)

app = FastAPI(title="FireReach Backend", version="2.0.0")

# Setup CORS to allow Vite React frontend local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint
@app.get("/")
def read_root():
    return {"status": "FireReach V2 System is active."}

# Register Core API Router
app.include_router(outreach_routes.router)
