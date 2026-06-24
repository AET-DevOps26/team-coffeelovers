"""
AI Travel Planner - GenAI Service

Purpose:
This FastAPI service is the independent GenAI microservice of the AI Travel
Planner project. It exposes API endpoints used by the Spring Boot backend to
generate travel itineraries and travel suggestions.

Current implementation:
This file implements the OpenAPI contract defined in `api/openapi.yaml`.
The current generation logic is intentionally deterministic and mock-based.
It does not call a real LLM provider yet.

Why mock first:
The goal of this step is to make the GenAI service contract-compatible,
testable, and usable for backend integration before adding external LLM
providers such as Logos or OpenAI.

Future improvements:
- Move request/response models into separate modules.
- Move route handlers into route modules.
- Add provider abstraction: mock, Logos, OpenAI.
- Add prompt templates and response validation.
- Add unit tests for `/api/v1/genai/generate` and `/api/v1/genai/suggest`.
- Add observability metrics for request count, latency, and errors.
"""

import os
from typing import List, Optional

import uvicorn
from fastapi import APIRouter, FastAPI
from pydantic import BaseModel, Field


app = FastAPI(
    title="AI Travel Planner - GenAI Service",
    description="GenAI microservice for the AI Travel Planner application",
    version="1.0.0",
)


class Budget(BaseModel):
    """Represents a monetary amount and currency for trip planning."""

    amount: float = Field(..., ge=0, description="Budget amount")
    currency: str = Field(
        ...,
        min_length=3,
        max_length=3,
        description="ISO 4217 currency code, for example EUR or USD",
    )


class Activity(BaseModel):
    """Represents a single suggested travel activity."""

    title: str
    description: str
    location: Optional[str] = None
    estimatedDuration: Optional[str] = None
    estimatedCost: Optional[Budget] = None
    category: Optional[str] = None


class ItineraryDay(BaseModel):
    """Represents one day in a generated travel itinerary."""

    day: int = Field(..., ge=1)
    title: str
    activities: List[Activity]


class GenerateItineraryRequest(BaseModel):
    """Request body for itinerary generation."""

    destination: str = Field(..., min_length=1)
    days: int = Field(..., ge=1, le=30)
    preferences: List[str] = Field(..., min_length=1)
    budget: Budget


class GenerateItineraryResponse(BaseModel):
    """Response body for itinerary generation."""

    summary: str
    itinerary: List[ItineraryDay]
    activities: List[Activity]


class SuggestRequest(BaseModel):
    """Request body for travel suggestion generation."""

    destination: str = Field(..., min_length=1)
    days: int = Field(..., ge=1, le=30)
    budget: Budget


class SuggestResponse(BaseModel):
    """Response body for travel suggestions."""

    suggestions: List[str]


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


genai_router = APIRouter(prefix="/api/v1/genai", tags=["GenAI"])


@genai_router.post("/generate", response_model=GenerateItineraryResponse)
async def generate_itinerary(request: GenerateItineraryRequest):
    """
    Generate a personalized day-by-day itinerary.

    Current behavior:
    Returns a deterministic mock response that matches the OpenAPI contract.

    Future behavior:
    This handler should delegate generation to a provider abstraction, for example:
    - MockProvider for local development and CI
    - LogosProvider for TUM Logos integration
    - OpenAIProvider for optional cloud-based inference
    """

    activities = [
        Activity(
            title=f"Explore {request.destination} city center",
            description=(
                f"Visit the main sights of {request.destination} based on "
                f"your preferences: {', '.join(request.preferences)}."
            ),
            location=f"{request.destination} city center",
            estimatedDuration="2 hours",
            estimatedCost=Budget(
                amount=0,
                currency=request.budget.currency,
            ),
            category="sightseeing",
        ),
        Activity(
            title="Local food experience",
            description=(
                "Try local food options that fit the selected travel "
                "preferences and budget."
            ),
            location=request.destination,
            estimatedDuration="1.5 hours",
            estimatedCost=Budget(
                amount=round(request.budget.amount * 0.15, 2),
                currency=request.budget.currency,
            ),
            category="food",
        ),
    ]

    itinerary = [
        ItineraryDay(
            day=day,
            title=f"Day {day} in {request.destination}",
            activities=activities,
        )
        for day in range(1, request.days + 1)
    ]

    return GenerateItineraryResponse(
        summary=(
            f"A {request.days}-day itinerary for {request.destination} focused on "
            f"{', '.join(request.preferences)}."
        ),
        itinerary=itinerary,
        activities=activities,
    )


@genai_router.post("/suggest", response_model=SuggestResponse)
async def suggest_travel_ideas(request: SuggestRequest):
    """
    Suggest travel preferences or activity ideas for a destination.

    Current behavior:
    Returns deterministic suggestions for integration testing.

    Future behavior:
    Suggestions should be generated by the selected GenAI provider and may use
    destination, duration, budget, season, or user profile information.
    """

    base_suggestions = [
        "old town",
        "local food",
        "photo spots",
        "museums",
        "walking tour",
    ]

    if request.budget.amount == 0:
        base_suggestions.extend(["free attractions", "public parks"])
    elif request.budget.amount < 100:
        base_suggestions.extend(["budget-friendly food", "self-guided tour"])
    else:
        base_suggestions.extend(["guided tour", "special dining experience"])

    return SuggestResponse(suggestions=base_suggestions)


app.include_router(genai_router)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)