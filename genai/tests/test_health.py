"""
Tests for the GenAI health endpoint.

These tests verify that the GenAI service exposes a basic operational health
check endpoint.
"""

from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_health_check_returns_ok():
    response = client.get("/genai/health")

    assert response.status_code == 200

    body = response.json()
    assert body["status"] == "ok"
    assert body["service"] == "genai"
    assert body["version"] == "1.0.0"