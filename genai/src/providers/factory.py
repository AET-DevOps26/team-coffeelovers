"""
Provider factory for the GenAI service.

The factory selects the active provider from runtime configuration.
"""

from src.config import GenAIProvider, GenAISettings, get_settings
from src.providers.mock_provider import MockProvider
from src.providers.openai_provider import OpenAIProvider


def create_provider(settings: GenAISettings | None = None):
    """Create the configured GenAI provider instance."""

    active_settings = settings or get_settings()

    if active_settings.provider == GenAIProvider.MOCK:
        return MockProvider()

    if active_settings.provider == GenAIProvider.OPENAI:
        return OpenAIProvider(
            api_key=active_settings.openai_api_key,
            model=active_settings.openai_model,
            base_url=active_settings.openai_base_url,
        )

    if active_settings.provider == GenAIProvider.LOGOS:
        raise NotImplementedError(
            "GENAI_PROVIDER=logos is configured, but the Logos provider is "
            "not implemented yet. Use GENAI_PROVIDER=mock or openai."
        )

    raise ValueError(f"Unsupported GenAI provider: {active_settings.provider}")