"""
Initial GenAI service entry point.
"""

import uvicorn
from fastapi import FastAPI

app = FastAPI(
    title="AI Travel Planner - GenAI Service",
    description="Initial FastAPI application for the GenAI microservice.",
    version="0.1.0",
)


@app.get("/")
async def root():
    """Root endpoint for basic service information."""
    return {
        "service": "AI Travel Planner - GenAI Service",
        "status": "running",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8001,
        reload=True,
    )