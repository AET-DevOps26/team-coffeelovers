"""
Service layer for GenAI itinerary and suggestion generation.

The service layer keeps route handlers thin and delegates generation work to
the configured provider. Suggestion generation currently remains deterministic
and uses the mock provider.
"""

from src.providers.factory import create_provider
from src.providers.mock_provider import MockProvider
from src.schemas import (
    GenerateItineraryRequest,
    GenerateItineraryResponse,
    SuggestRequest,
    SuggestResponse,
)


class ItineraryService:
    """Coordinates itinerary and suggestion generation."""

    def __init__(self) -> None:
        self.provider = create_provider()
        self.suggestion_provider = MockProvider()

    def generate_itinerary(
        self,
        request: GenerateItineraryRequest,
    ) -> GenerateItineraryResponse:
        return self.provider.generate_itinerary(request)

    def suggest_travel_ideas(self, request: SuggestRequest) -> SuggestResponse:
        return self.suggestion_provider.suggest_travel_ideas(request)