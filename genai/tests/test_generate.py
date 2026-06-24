"""
Tests for the GenAI itinerary generation endpoint.

The current GenAI implementation uses deterministic mock data. These tests
verify that the `/api/v1/genai/generate` endpoint follows the expected API
contract before real LLM providers such as OpenAI or Logos are added.
"""

from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_generate_itinerary_returns_mock_itinerary():
    request_body = {
        "destination": "Maastricht",
        "days": 2,
        "preferences": ["old town", "food", "photo spots"],
        "budget": {
            "amount": 250,
            "currency": "EUR",
        },
    }

    response = client.post("/api/v1/genai/generate", json=request_body)

    assert response.status_code == 200

    body = response.json()

    assert body["summary"] is not None
    assert "Maastricht" in body["summary"]

    assert len(body["itinerary"]) == 2
    assert body["itinerary"][0]["day"] == 1
    assert body["itinerary"][1]["day"] == 2

    assert len(body["activities"]) > 0
    assert body["activities"][0]["title"] is not None
    assert body["activities"][0]["estimatedCost"]["currency"] == "EUR"


def test_generate_itinerary_rejects_invalid_days():
    request_body = {
        "destination": "Maastricht",
        "days": 0,
        "preferences": ["old town", "food"],
        "budget": {
            "amount": 250,
            "currency": "EUR",
        },
    }

    response = client.post("/api/v1/genai/generate", json=request_body)

    assert response.status_code == 422


def test_generate_itinerary_rejects_missing_destination():
    request_body = {
        "days": 2,
        "preferences": ["old town", "food"],
        "budget": {
            "amount": 250,
            "currency": "EUR",
        },
    }

    response = client.post("/api/v1/genai/generate", json=request_body)

    assert response.status_code == 422