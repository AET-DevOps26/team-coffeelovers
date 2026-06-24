"""
Pydantic schemas for the GenAI service API.

These models define the request and response bodies used by the FastAPI
endpoints. They should stay aligned with the OpenAPI contract in
`api/openapi.yaml`.
"""

from typing import List, Optional

from pydantic import BaseModel, Field


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