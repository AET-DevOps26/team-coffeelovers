"""
Base provider interface for GenAI itinerary generation.

All providers must implement this interface so the service layer can call
mock, OpenAI, Logos, or future local providers without depending on their
implementation details.
"""

from abc import ABC, abstractmethod

from src.schemas import GenerateItineraryRequest, GenerateItineraryResponse


class LLMProvider(ABC):
    """Abstract interface for GenAI providers."""

    @abstractmethod
    def generate_itinerary(
        self,
        request: GenerateItineraryRequest,
    ) -> GenerateItineraryResponse:
        """Generate a validated itinerary response."""