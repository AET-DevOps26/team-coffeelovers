"""
Tests for the GenAI travel suggestion endpoint.

These tests verify that the mock suggestion endpoint returns useful deterministic
suggestions and applies simple budget-based logic. This helps keep the endpoint
stable for backend integration.
"""

from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_suggest_travel_ideas_returns_suggestions():
    request_body = {
        "destination": "Maastricht",
        "days": 2,
        "budget": {
            "amount": 250,
            "currency": "EUR",
        },
    }

    response = client.post("/api/v1/genai/suggest", json=request_body)

    assert response.status_code == 200

    body = response.json()

    assert "suggestions" in body
    assert len(body["suggestions"]) > 0
    assert "old town" in body["suggestions"]


def test_suggest_travel_ideas_adds_budget_suggestions():
    request_body = {
        "destination": "Maastricht",
        "days": 2,
        "budget": {
            "amount": 50,
            "currency": "EUR",
        },
    }

    response = client.post("/api/v1/genai/suggest", json=request_body)

    assert response.status_code == 200

    body = response.json()

    assert "budget-friendly food" in body["suggestions"]
    assert "self-guided tour" in body["suggestions"]