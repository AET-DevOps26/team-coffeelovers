"""
Provider factory for the GenAI service.

This module decides which provider implementation should be used based on the
runtime configuration. For now, only the mock provider is implemented. OpenAI
and Logos are recognized as valid provider modes but will be implemented in a
separate ticket.
"""

from src.config import GenAIProvider, GenAISettings, get_settings
from src.providers.mock_provider import MockProvider


def create_provider(settings: GenAISettings | None = None):
    """Create the configured GenAI provider instance."""

    active_settings = settings or get_settings()

    if active_settings.provider == GenAIProvider.MOCK:
        return MockProvider()

    if active_settings.provider == GenAIProvider.OPENAI:
        raise NotImplementedError(
            "GENAI_PROVIDER=openai is configured, but the OpenAI provider is "
            "not implemented yet. Use GENAI_PROVIDER=mock until the OpenAI "
            "provider ticket is completed."
        )

    if active_settings.provider == GenAIProvider.LOGOS:
        raise NotImplementedError(
            "GENAI_PROVIDER=logos is configured, but the Logos provider is "
            "not implemented yet. Use GENAI_PROVIDER=mock until the Logos "
            "provider ticket is completed."
        )

    raise ValueError(f"Unsupported GenAI provider: {active_settings.provider}")