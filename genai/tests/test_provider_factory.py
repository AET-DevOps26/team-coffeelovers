"""
Tests for the GenAI provider factory.

The factory should create the mock provider by default and reject provider modes
that are recognized but not implemented yet.
"""

import pytest

from src.config import GenAIProvider, GenAISettings
from src.providers.factory import create_provider
from src.providers.mock_provider import MockProvider


def _settings_for(provider: GenAIProvider) -> GenAISettings:
    return GenAISettings(
        provider=provider,
        log_level="INFO",
        openai_api_key="",
        openai_base_url="https://api.openai.com/v1",
        openai_model="",
        logos_api_key="",
        logos_base_url="https://logos.aet.cit.tum.de/v1",
        logos_model="openai/gpt-oss-120b",
    )


def test_factory_creates_mock_provider():
    provider = create_provider(_settings_for(GenAIProvider.MOCK))

    assert isinstance(provider, MockProvider)


def test_factory_rejects_openai_until_provider_is_implemented():
    with pytest.raises(NotImplementedError, match="OpenAI provider"):
        create_provider(_settings_for(GenAIProvider.OPENAI))


def test_factory_rejects_logos_until_provider_is_implemented():
    with pytest.raises(NotImplementedError, match="Logos provider"):
        create_provider(_settings_for(GenAIProvider.LOGOS))