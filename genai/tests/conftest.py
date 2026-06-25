"""
Pytest configuration for the GenAI service tests.

Purpose:
The test files import the FastAPI application from `src.main`.
When tests are executed from different working directories or CI environments,
Python may not automatically include the GenAI project root in the import path.

This file makes the test setup more robust by adding the `genai/` directory
to `sys.path` before test modules are imported.
"""

import sys
from pathlib import Path


GENAI_ROOT = Path(__file__).resolve().parents[1]

if str(GENAI_ROOT) not in sys.path:
    sys.path.insert(0, str(GENAI_ROOT))