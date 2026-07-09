"""
Logos provider implementation for the GenAI service.

This provider uses LangChain's ChatOpenAI integration with the
OpenAI-compatible Logos API. It is only used when
GENAI_PROVIDER=logos is explicitly configured.
"""

import json
import os
from typing import Any

from langchain_openai import ChatOpenAI
from pydantic import ValidationError

from src.prompts import format_itinerary_prompt
from src.providers.base import LLMProvider
from src.schemas import GenerateItineraryRequest, GenerateItineraryResponse


DEFAULT_LOGOS_BASE_URL = "https://logos.aet.cit.tum.de/v1"
DEFAULT_LOGOS_MODEL = "openai/gpt-oss-120b"


class LogosProvider(LLMProvider):
    """Generates itineraries using the OpenAI-compatible Logos API."""

    def __init__(
        self,
        api_key: str | None = None,
        model: str | None = None,
        base_url: str | None = None,
        chat_model: Any | None = None,
    ) -> None:
        self.api_key = api_key or os.getenv("LOGOS_API_KEY", "")
        self.model = model or os.getenv("LOGOS_MODEL", DEFAULT_LOGOS_MODEL)
        self.base_url = base_url or os.getenv(
            "LOGOS_BASE_URL",
            DEFAULT_LOGOS_BASE_URL,
        )

        if chat_model is not None:
            self.chat_model = chat_model
            return

        if not self.api_key:
            raise ValueError(
                "LOGOS_API_KEY is required when GENAI_PROVIDER=logos. "
                "Set LOGOS_API_KEY locally or use GENAI_PROVIDER=mock."
            )

        self.chat_model = ChatOpenAI(
            api_key=self.api_key,
            model=self.model,
            base_url=self.base_url,
            temperature=0.2,
        )

    def generate_itinerary(
        self,
        request: GenerateItineraryRequest,
    ) -> GenerateItineraryResponse:
        """Generate and validate an itinerary response."""

        messages = format_itinerary_prompt(request)
        llm_response = self.chat_model.invoke(messages)
        content = getattr(llm_response, "content", llm_response)

        if not isinstance(content, str):
            raise ValueError("LogosProvider received a non-string LLM response.")

        try:
            parsed_content = json.loads(content)
            return GenerateItineraryResponse.model_validate(parsed_content)
        except json.JSONDecodeError as exc:
            raise ValueError("LogosProvider returned invalid JSON.") from exc
        except ValidationError as exc:
            raise ValueError(
                "LogosProvider returned JSON that does not match the API schema."
            ) from exc