"""
Tests for the GenAI provider factory.

The factory should create the mock provider by default and reject provider modes
that are recognized but not implemented yet.
"""

import pytest

from src.config import GenAIProvider, GenAISettings
from src.providers.factory import create_provider
from src.providers.mock_provider import MockProvider
from src.providers.openai_provider import OpenAIProvider
from src.providers.logos_provider import LogosProvider


def _settings_for(provider: GenAIProvider) -> GenAISettings:
    return GenAISettings(
        provider=provider,
        log_level="INFO",
        openai_api_key="test-openai-key",
        openai_base_url="https://api.openai.com/v1",
        openai_model="gpt-4o-mini",
        logos_api_key="test-logos-key",
        logos_base_url="https://logos.aet.cit.tum.de/v1",
        logos_model="openai/gpt-oss-120b",
    )


def test_factory_creates_mock_provider():
    provider = create_provider(_settings_for(GenAIProvider.MOCK))

    assert isinstance(provider, MockProvider)

def test_factory_creates_openai_provider():
    provider = create_provider(_settings_for(GenAIProvider.OPENAI))

    assert isinstance(provider, OpenAIProvider)

def test_factory_creates_logos_provider_when_configured():
    provider = create_provider(
        _settings_for(GenAIProvider.LOGOS)
    )

    assert isinstance(provider, LogosProvider)
