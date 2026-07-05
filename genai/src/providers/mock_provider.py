"""
Mock provider for deterministic GenAI responses.

This provider does not call any external LLM. It is used for local development,
CI tests, and backend integration before OpenAI or Logos are enabled.
"""

from src.providers.base import LLMProvider

from src.schemas import (
    Activity,
    Budget,
    GenerateItineraryRequest,
    GenerateItineraryResponse,
    ItineraryDay,
    SuggestRequest,
    SuggestResponse,
)


class MockProvider(LLMProvider):
    """Generates deterministic mock itineraries and suggestions."""

    def generate_itinerary(
        self,
        request: GenerateItineraryRequest,
    ) -> GenerateItineraryResponse:
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
                f"A {request.days}-day itinerary for {request.destination} "
                f"focused on {', '.join(request.preferences)}."
            ),
            itinerary=itinerary,
            activities=activities,
        )

    def suggest_travel_ideas(self, request: SuggestRequest) -> SuggestResponse:
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