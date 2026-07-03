"""
Configuration helpers for the GenAI service.

This module reads provider-related settings from environment variables.
No secrets should be hardcoded here.
"""

import os
from dataclasses import dataclass
from enum import Enum


class GenAIProvider(str, Enum):
    """Supported GenAI provider modes."""

    MOCK = "mock"
    OPENAI = "openai"
    LOGOS = "logos"


@dataclass(frozen=True)
class GenAISettings:
    """Runtime settings for the GenAI service."""

    provider: GenAIProvider
    log_level: str

    openai_api_key=os.getenv("OPENAI_API_KEY", ""),
    openai_base_url=os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1"),
    openai_model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),

    logos_api_key: str
    logos_base_url: str
    logos_model: str


def _read_provider() -> GenAIProvider:
    provider_value = os.getenv("GENAI_PROVIDER", GenAIProvider.MOCK.value).lower()

    try:
        return GenAIProvider(provider_value)
    except ValueError as exc:
        allowed_values = ", ".join(provider.value for provider in GenAIProvider)
        raise ValueError(
            f"Unsupported GENAI_PROVIDER='{provider_value}'. "
            f"Allowed values are: {allowed_values}."
        ) from exc


def get_settings() -> GenAISettings:
    """Read GenAI service settings from environment variables."""

    return GenAISettings(
        provider=_read_provider(),
        log_level=os.getenv("GENAI_LOG_LEVEL", "INFO"),
        openai_api_key=os.getenv("OPENAI_API_KEY", ""),
        openai_base_url=os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1"),
        openai_model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        logos_api_key=os.getenv("LOGOS_API_KEY", ""),
        logos_base_url=os.getenv("LOGOS_BASE_URL", "https://logos.aet.cit.tum.de/v1"),
        logos_model=os.getenv("LOGOS_MODEL", "openai/gpt-oss-120b"),
    )