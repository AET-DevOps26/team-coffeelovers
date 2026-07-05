"""
Pytest configuration for the GenAI service tests.

The test suite must not require external LLM credentials. It therefore forces
the runtime provider to mock mode before the FastAPI app is imported.
"""

import os
import sys
from pathlib import Path


GENAI_ROOT = Path(__file__).resolve().parents[1]

if str(GENAI_ROOT) not in sys.path:
    sys.path.insert(0, str(GENAI_ROOT))

os.environ["GENAI_PROVIDER"] = "mock"
os.environ.pop("OPENAI_API_KEY", None)