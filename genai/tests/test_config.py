"""
Tests for GenAI provider configuration.

These tests verify that the GenAI service reads provider settings from
environment variables correctly. They do not call external APIs.
"""

import pytest

from src.config import GenAIProvider, get_settings


def test_default_provider_is_mock(monkeypatch):
    monkeypatch.delenv("GENAI_PROVIDER", raising=False)

    settings = get_settings()

    assert settings.provider == GenAIProvider.MOCK


def test_openai_provider_is_recognized(monkeypatch):
    monkeypatch.setenv("GENAI_PROVIDER", "openai")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-key")
    monkeypatch.setenv("OPENAI_MODEL", "test-openai-model")

    settings = get_settings()

    assert settings.provider == GenAIProvider.OPENAI
    assert settings.openai_api_key == "test-openai-key"
    assert settings.openai_model == "test-openai-model"


def test_logos_provider_is_recognized(monkeypatch):
    monkeypatch.setenv("GENAI_PROVIDER", "logos")
    monkeypatch.setenv("LOGOS_API_KEY", "test-logos-key")

    settings = get_settings()

    assert settings.provider == GenAIProvider.LOGOS
    assert settings.logos_api_key == "test-logos-key"
    assert settings.logos_base_url == "https://logos.aet.cit.tum.de/v1"
    assert settings.logos_model == "openai/gpt-oss-120b"


def test_invalid_provider_raises_clear_error(monkeypatch):
    monkeypatch.setenv("GENAI_PROVIDER", "invalid-provider")

    with pytest.raises(ValueError, match="Unsupported GENAI_PROVIDER"):
        get_settings()