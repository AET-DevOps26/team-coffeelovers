"""
AI Travel Planner - GenAI Service

Purpose:
This FastAPI service is the independent GenAI microservice of the AI Travel
Planner project. It exposes API endpoints used by the Spring Boot backend to
generate travel itineraries and travel suggestions.

Current implementation:
The service currently uses a deterministic mock provider. This keeps the API
contract testable and backend-ready before external LLM providers such as
OpenAI or Logos are added.
"""

import os

import uvicorn
from fastapi import FastAPI

from src.routers.genai import router as genai_router


app = FastAPI(
    title="AI Travel Planner - GenAI Service",
    description="GenAI microservice for the AI Travel Planner application",
    version="1.0.0",
)


@app.get("/genai/health")
async def health_check():
    """
    Health endpoint for local checks, Docker Compose, and future Kubernetes probes.

    This endpoint is intentionally kept outside `/api/v1/genai` because health
    checks are operational endpoints, not business API endpoints.
    """

    return {
        "status": "ok",
        "service": "genai",
        "version": "1.0.0",
    }


app.include_router(genai_router)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)