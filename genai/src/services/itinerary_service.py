"""
Service layer for GenAI itinerary and suggestion generation.

The service layer keeps route handlers thin and delegates the actual generation
work to the selected provider. For now, it uses the mock provider. Later, this
is where OpenAI or Logos provider selection can be added.
"""

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
        self.provider = MockProvider()

    def generate_itinerary(
        self,
        request: GenerateItineraryRequest,
    ) -> GenerateItineraryResponse:
        return self.provider.generate_itinerary(request)

    def suggest_travel_ideas(self, request: SuggestRequest) -> SuggestResponse:
        return self.provider.suggest_travel_ideas(request)