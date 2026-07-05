"""
Prompt templates for the GenAI service.

Prompts are kept separate from providers and route handlers so they can be
tested and improved independently.
"""

from langchain_core.messages import BaseMessage
from langchain_core.prompts import ChatPromptTemplate

from src.schemas import GenerateItineraryRequest


ITINERARY_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            (
                "You are a travel planning assistant. "
                "Create practical and realistic travel itineraries. "
                "Return only valid JSON. "
                "Do not include Markdown. "
                "Do not include explanations outside the JSON."
            ),
        ),
        (
            "human",
            (
                "Create a {days}-day itinerary for {destination}.\n"
                "Preferences: {preferences}\n"
                "Budget: {budget_amount} {budget_currency}\n\n"
                "Return JSON matching exactly this structure:\n"
                "{{\n"
                '  "summary": "short summary",\n'
                '  "itinerary": [\n'
                "    {{\n"
                '      "day": 1,\n'
                '      "title": "day title",\n'
                '      "activities": [\n'
                "        {{\n"
                '          "title": "activity title",\n'
                '          "description": "activity description",\n'
                '          "location": "activity location",\n'
                '          "estimatedDuration": "duration",\n'
                '          "estimatedCost": {{\n'
                '            "amount": 0,\n'
                '            "currency": "{budget_currency}"\n'
                "          }},\n"
                '          "category": "category"\n'
                "        }}\n"
                "      ]\n"
                "    }}\n"
                "  ],\n"
                '  "activities": []\n'
                "}}\n"
            ),
        ),
    ]
)


def format_itinerary_prompt(request: GenerateItineraryRequest) -> list[BaseMessage]:
    """Format the itinerary prompt from a structured request."""

    return ITINERARY_PROMPT.format_messages(
        destination=request.destination,
        days=request.days,
        preferences=", ".join(request.preferences),
        budget_amount=request.budget.amount,
        budget_currency=request.budget.currency,
    )