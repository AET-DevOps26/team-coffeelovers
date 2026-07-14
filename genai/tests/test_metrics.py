"""Tests for the GenAI Prometheus metrics endpoint."""

from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_metrics_endpoint_returns_prometheus_metrics():
    client.get("/genai/health")

    response = client.get("/metrics")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/plain")
    assert "http_requests_total" in response.text