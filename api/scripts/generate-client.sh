#!/usr/bin/env bash
set -euo pipefail

# Purpose:
# This script generates a Python client package from the OpenAPI specification.
# The OpenAPI file is the single source of truth for the GenAI API contract.
# Generated client code can be used by Python components or tests that need to
# call the GenAI API without manually writing HTTP request/response models.
#
# Note:
# The current project flow mainly requires the Spring Boot backend to call the
# Python GenAI service. Therefore, this Python client generation script is not
# required for the current OpenAPI contract task.
#
# Future improvement:
# If the team decides to use OpenAPI-based code generation consistently, this
# script should be revisited together with Java client generation for the
# Spring Boot backend and TypeScript client generation for the frontend.
# The team should also decide whether generated clients are committed to the
# repository or generated during local setup/CI.

echo "Generating Python client from OpenAPI specification..."

cd "$(dirname "$0")/.."

if ! command -v node >/dev/null 2>&1; then
    echo "Error: node is not installed or not available in PATH."
    exit 1
fi

if ! command -v openapi-generator-cli >/dev/null 2>&1; then
    echo "Error: openapi-generator-cli not found."
    echo "Install it with: npm install @openapitools/openapi-generator-cli -g"
    exit 1
fi

if [ ! -f openapi.yaml ]; then
    echo "Error: openapi.yaml not found in api directory."
    exit 1
fi

rm -rf genai_client
mkdir -p genai_client

openapi-generator-cli generate \
    -i openapi.yaml \
    -g python \
    -o genai_client/ \
    --package-name "genai_client" \
    --git-repo-id "team-coffeelovers/genai-client" \
    --git-user-id "coffeelovers"

echo "Python client generated successfully in genai_client/"