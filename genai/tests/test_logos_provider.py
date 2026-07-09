"""
Unit tests for the Logos provider.

The tests use fake chat models and do not call the real Logos API.
No Logos API key or TUM network connection is required.
"""

import json
from types import SimpleNamespace

import pytest

from src.providers.logos_provider import (
    DEFAULT_LOGOS_BASE_URL,
    DEFAULT_LOGOS_MODEL,
    LogosProvider,
)
from src.schemas import Budget, GenerateItineraryRequest


class FakeChatModel:
    """Returns a predefined response without calling an external API."""

    def __init__(self, response_content):
        self.response_content = response_content
        self.received_messages = None

    def invoke(self, messages):
        self.received_messages = messages
        return SimpleNamespace(content=self.response_content)


def create_request() -> GenerateItineraryRequest:
    """Create a valid itinerary request for provider tests."""

    return GenerateItineraryRequest(
        destination="Maastricht",
        days=2,
        preferences=["old town", "food"],
        budget=Budget(
            amount=250,
            currency="EUR",
        ),
    )


def create_valid_response() -> dict:
    """Create a valid response matching the GenAI API schema."""

    activity = {
        "title": "Explore Vrijthof Square",
        "description": "Visit the historic square and nearby landmarks.",
        "location": "Vrijthof, Maastricht",
        "estimatedDuration": "2 hours",
        "estimatedCost": {
            "amount": 0,
            "currency": "EUR",
        },
        "category": "sightseeing",
    }

    return {
        "summary": "A two-day cultural and food itinerary for Maastricht.",
        "itinerary": [
            {
                "day": 1,
                "title": "Historic Maastricht",
                "activities": [activity],
            },
            {
                "day": 2,
                "title": "Local Food and Culture",
                "activities": [activity],
            },
        ],
        "activities": [activity],
    }


def test_generate_itinerary_returns_valid_response():
    fake_model = FakeChatModel(
        json.dumps(create_valid_response())
    )

    provider = LogosProvider(chat_model=fake_model)

    response = provider.generate_itinerary(create_request())

    assert response.summary == (
        "A two-day cultural and food itinerary for Maastricht."
    )
    assert len(response.itinerary) == 2
    assert len(response.activities) == 1
    assert response.itinerary[0].day == 1
    assert response.activities[0].title == "Explore Vrijthof Square"
    assert fake_model.received_messages is not None


def test_generate_itinerary_rejects_invalid_json():
    fake_model = FakeChatModel("This is not valid JSON.")

    provider = LogosProvider(chat_model=fake_model)

    with pytest.raises(
        ValueError,
        match="LogosProvider returned invalid JSON",
    ):
        provider.generate_itinerary(create_request())


def test_generate_itinerary_rejects_invalid_schema():
    invalid_response = {
        "summary": "Incomplete response",
    }

    fake_model = FakeChatModel(
        json.dumps(invalid_response)
    )

    provider = LogosProvider(chat_model=fake_model)

    with pytest.raises(
        ValueError,
        match=(
            "LogosProvider returned JSON "
            "that does not match the API schema"
        ),
    ):
        provider.generate_itinerary(create_request())


def test_generate_itinerary_rejects_non_string_response():
    fake_model = FakeChatModel(
        {
            "summary": "Response is not a string",
        }
    )

    provider = LogosProvider(chat_model=fake_model)

    with pytest.raises(
        ValueError,
        match="LogosProvider received a non-string LLM response",
    ):
        provider.generate_itinerary(create_request())


def test_missing_api_key_raises_clear_error(
    monkeypatch,
):
    monkeypatch.delenv("LOGOS_API_KEY", raising=False)

    with pytest.raises(
        ValueError,
        match=(
            "LOGOS_API_KEY is required "
            "when GENAI_PROVIDER=logos"
        ),
    ):
        LogosProvider()


def test_provider_uses_default_configuration_with_fake_model():
    provider = LogosProvider(
        api_key="test-key",
        chat_model=FakeChatModel(
            json.dumps(create_valid_response())
        ),
    )

    assert provider.api_key == "test-key"
    assert provider.base_url == DEFAULT_LOGOS_BASE_URL
    assert provider.model == DEFAULT_LOGOS_MODEL