"""
Tests for GenAI prompt formatting.
"""

from src.prompts import format_itinerary_prompt
from src.schemas import Budget, GenerateItineraryRequest


def test_itinerary_prompt_contains_request_values():
    request = GenerateItineraryRequest(
        destination="Maastricht",
        days=2,
        preferences=["old town", "food"],
        budget=Budget(amount=250, currency="EUR"),
    )

    messages = format_itinerary_prompt(request)
    prompt_text = "\n".join(message.content for message in messages)

    assert "Maastricht" in prompt_text
    assert "2-day" in prompt_text
    assert "old town" in prompt_text
    assert "food" in prompt_text
    assert "250" in prompt_text
    assert "EUR" in prompt_text


def test_itinerary_prompt_requests_json_only():
    request = GenerateItineraryRequest(
        destination="Paris",
        days=1,
        preferences=["museums"],
        budget=Budget(amount=100, currency="EUR"),
    )

    messages = format_itinerary_prompt(request)
    prompt_text = "\n".join(message.content for message in messages).lower()

    assert "return only valid json" in prompt_text
    assert "do not include markdown" in prompt_text
    assert "summary" in prompt_text
    assert "itinerary" in prompt_text
    assert "activities" in prompt_text