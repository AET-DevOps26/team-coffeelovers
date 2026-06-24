"""
API routes for the GenAI service.

This module exposes the business endpoints used by other services, especially
the Spring Boot backend. The route handlers should remain small and delegate
generation logic to the service layer.
"""

from fastapi import APIRouter

from src.schemas import (
    GenerateItineraryRequest,
    GenerateItineraryResponse,
    SuggestRequest,
    SuggestResponse,
)
from src.services.itinerary_service import ItineraryService


router = APIRouter(prefix="/api/v1/genai", tags=["GenAI"])

itinerary_service = ItineraryService()


@router.post("/generate", response_model=GenerateItineraryResponse)
async def generate_itinerary(
    request: GenerateItineraryRequest,
) -> GenerateItineraryResponse:
    """
    Generate a personalized day-by-day itinerary.

    The current implementation uses a mock provider. Later tickets will add
    OpenAI-compatible providers for OpenAI and Logos.
    """

    return itinerary_service.generate_itinerary(request)


@router.post("/suggest", response_model=SuggestResponse)
async def suggest_travel_ideas(request: SuggestRequest) -> SuggestResponse:
    """
    Suggest travel preferences or activity ideas for a destination.

    The current implementation uses deterministic mock suggestions.
    """

    return itinerary_service.suggest_travel_ideas(request)