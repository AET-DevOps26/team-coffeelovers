"""
Tests for the OpenAI provider.

These tests use a fake chat model and never call the real OpenAI API.
"""

import pytest
from langchain_core.messages import AIMessage

from src.providers.openai_provider import OpenAIProvider
from src.schemas import Budget, GenerateItineraryRequest


class FakeChatModel:
    """Fake LangChain chat model used to avoid real API calls in tests."""

    def __init__(self, content: str) -> None:
        self.content = content
        self.received_messages = None

    def invoke(self, messages):
        self.received_messages = messages
        return AIMessage(content=self.content)


def _request() -> GenerateItineraryRequest:
    return GenerateItineraryRequest(
        destination="Maastricht",
        days=2,
        preferences=["old town", "food"],
        budget=Budget(amount=250, currency="EUR"),
    )


def test_openai_provider_returns_validated_response():
    fake_model = FakeChatModel(
        content=(
            '{"summary":"Mock itinerary",'
            '"itinerary":[{"day":1,"title":"Day 1","activities":[]}],'
            '"activities":[]}'
        )
    )
    provider = OpenAIProvider(chat_model=fake_model)

    response = provider.generate_itinerary(_request())

    assert response.summary == "Mock itinerary"
    assert len(response.itinerary) == 1
    assert fake_model.received_messages is not None


def test_openai_provider_passes_prompt_to_chat_model():
    fake_model = FakeChatModel(
        content='{"summary":"Mock","itinerary":[],"activities":[]}'
    )
    provider = OpenAIProvider(chat_model=fake_model)

    provider.generate_itinerary(_request())

    prompt_text = "\n".join(
        message.content for message in fake_model.received_messages
    )

    assert "Maastricht" in prompt_text
    assert "old town" in prompt_text
    assert "food" in prompt_text
    assert "250" in prompt_text
    assert "EUR" in prompt_text


def test_openai_provider_requires_api_key_without_fake_model(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    with pytest.raises(ValueError, match="OPENAI_API_KEY is required"):
        OpenAIProvider()


def test_openai_provider_rejects_invalid_json():
    fake_model = FakeChatModel(content="not json")
    provider = OpenAIProvider(chat_model=fake_model)

    with pytest.raises(ValueError, match="invalid JSON"):
        provider.generate_itinerary(_request())


def test_openai_provider_rejects_schema_mismatch():
    fake_model = FakeChatModel(content='{"wrong":"shape"}')
    provider = OpenAIProvider(chat_model=fake_model)

    with pytest.raises(ValueError, match="does not match the API schema"):
        provider.generate_itinerary(_request())