"""
Service layer for GenAI itinerary and suggestion generation.

The service layer keeps route handlers thin and delegates the actual generation
work to the selected provider. Provider selection is handled through the
provider factory so future OpenAI and Logos integrations can be added without
changing route handlers.
"""

from src.providers.factory import create_provider
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

    def generate_itinerary(
        self,
        request: GenerateItineraryRequest,
    ) -> GenerateItineraryResponse:
        return self.provider.generate_itinerary(request)

    def suggest_travel_ideas(self, request: SuggestRequest) -> SuggestResponse:
        return self.provider.suggest_travel_ideas(request)