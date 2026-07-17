# GenAI Service

The GenAI Service is the independent Python and FastAPI microservice of the AI Travel Planner.

It is responsible for:

- generating structured travel itineraries
- producing alternative activity suggestions
- building prompts from trip information
- validating structured LLM responses
- isolating provider-specific AI logic from the rest of the application
- exposing Prometheus-compatible metrics

## Supported Providers

| Provider | Status | Purpose |
|---|---|---|
| `mock` | Implemented | Deterministic local development and CI |
| `openai` | Implemented | OpenAI models through `langchain-openai` |
| `logos` | Implemented | TUM Logos through an OpenAI-compatible API |

The default provider is `mock`.

The mock provider allows the service and automated tests to run without:

- external API credentials
- network access
- API quota
- external provider costs

## Architecture

```txt
HTTP Request
    |
    v
FastAPI Router
    |
    v
Itinerary Service
    |
    v
Provider Factory
    |
    +----------------+----------------+----------------+
    |                |                |
    v                v                v
Mock Provider    OpenAI Provider   Logos Provider
    |                |                |
    +----------------+----------------+
                     |
                     v
             Response Validation
                     |
                     v
               HTTP Response
```

The active provider is selected through environment configuration.

Routes and service logic remain independent from the selected provider.

## Technology

```txt
Python 3.12
FastAPI
Pydantic
Uvicorn
langchain-openai
prometheus-fastapi-instrumentator
pytest
```

## Project Structure

```txt
genai/
├── src/
│   ├── main.py
│   ├── config.py
│   ├── prompts.py
│   ├── schemas.py
│   ├── providers/
│   │   ├── base.py
│   │   ├── factory.py
│   │   ├── mock_provider.py
│   │   ├── openai_provider.py
│   │   └── logos_provider.py
│   ├── routers/
│   │   └── genai.py
│   └── services/
│       └── itinerary_service.py
├── tests/
├── requirements.txt
├── Dockerfile
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/genai/health` | Returns the service health status |
| `POST` | `/api/v1/genai/generate` | Generates a structured travel itinerary |
| `POST` | `/api/v1/genai/suggest` | Generates alternative activity suggestions |
| `GET` | `/metrics` | Exposes Prometheus-compatible metrics |
| `GET` | `/docs` | Opens the FastAPI Swagger UI |

The public API contract is provider-independent.

The OpenAPI contract is stored at:

```txt
api/openapi.yaml
```

Request and response models must remain aligned with this contract.

## Generate Request

The generation endpoint accepts:

- destination
- number of travel days
- travel preferences
- optional budget information

Example:

```json
{
  "destination": "Maastricht",
  "days": 2,
  "preferences": [
    "old town",
    "local food"
  ],
  "budget": {
    "amount": 250,
    "currency": "EUR"
  }
}
```

Budget support currently exists at the GenAI API level.

The frontend does not currently collect budget information, and budget is not yet integrated into the complete frontend and backend workflow.

## Environment Configuration

Environment configuration depends on how the service is started.

### Standalone GenAI Development

When running only the GenAI service locally, create:

```txt
genai/.env
```

### Complete Docker Compose Stack

When running the complete application, Docker Compose reads configuration from:

```txt
infra/.env
```

Do not mix the two environment file locations.

Use only the environment file that matches the selected execution mode.

## Mock Provider

```properties
GENAI_PROVIDER=mock
GENAI_LOG_LEVEL=INFO
```

Use the mock provider for:

- local development
- CI
- unit tests
- API contract testing
- development without external API access

The mock provider does not require an API key.

## OpenAI Provider

```properties
GENAI_PROVIDER=openai
GENAI_LOG_LEVEL=INFO

OPENAI_API_KEY=replace-with-your-api-key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

The OpenAI provider uses `langchain-openai`.

The API key must be supplied through environment configuration.

Do not commit, print, log, or share the API key.

## Logos Provider

```properties
GENAI_PROVIDER=logos
GENAI_LOG_LEVEL=INFO

LOGOS_API_KEY=replace-with-your-logos-key
LOGOS_BASE_URL=https://logos.aet.cit.tum.de/v1
LOGOS_MODEL=openai/gpt-oss-120b
```

Logos uses an OpenAI-compatible API.

Requirements:

- the API key must be valid
- the base URL must include `/v1`
- the model name must include the required provider prefix
- access to the TUM network may be required
- eduVPN may be required outside the TUM network

Do not commit or share the Logos API key.

## Local Development

### Requirements

Install:

- Python 3.12
- pip

### Create a Virtual Environment

From the repository root:

```bash
python -m venv genai/.venv
```

Activate it on Linux, macOS, or WSL:

```bash
source genai/.venv/bin/activate
```

Activate it on Git Bash for Windows:

```bash
source genai/.venv/Scripts/activate
```

### Install Dependencies

```bash
pip install -r genai/requirements.txt
```

### Configure the Service

Create:

```txt
genai/.env
```

For local development, use:

```properties
GENAI_PROVIDER=mock
GENAI_LOG_LEVEL=INFO
```

### Start the Service

From the repository root:

```bash
cd genai
uvicorn src.main:app --reload --port 8001
```

The service is available at:

```txt
http://localhost:8001
```

Swagger UI:

```txt
http://localhost:8001/docs
```

Metrics:

```txt
http://localhost:8001/metrics
```

## Run with Docker Compose

The recommended way to run the complete application is Docker Compose.

Docker Compose configuration:

```txt
infra/docker-compose.yml
```

Environment configuration:

```txt
infra/.env
```

From the repository root:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  up --build
```

Detailed Docker Compose instructions, service checks, monitoring, logs, and troubleshooting are documented in:

```txt
infra/README.md
```

## Test the API

### Health Check

Through the API Gateway:

```bash
curl http://localhost:8080/genai/health
```

Directly:

```bash
curl http://localhost:8001/genai/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "genai",
  "version": "1.0.0"
}
```

## Generate an Itinerary

Through the API Gateway:

```bash
curl -X POST http://localhost:8080/api/v1/genai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Maastricht",
    "days": 2,
    "preferences": [
      "old town",
      "local food",
      "photo spots"
    ]
  }'
```

Expected response content includes:

```txt
summary
itinerary
activities
```

The optional budget field can be tested directly at the GenAI API level:

```bash
curl -X POST http://localhost:8080/api/v1/genai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Maastricht",
    "days": 2,
    "preferences": [
      "old town",
      "local food"
    ],
    "budget": {
      "amount": 250,
      "currency": "EUR"
    }
  }'
```

This does not mean budget is available in the current frontend workflow.

## Test with Swagger UI

Open:

```txt
http://localhost:8001/docs
```

Select:

```txt
POST /api/v1/genai/generate
```

Use **Try it out**, provide a valid request body, and select **Execute**.

A valid request should return:

```txt
HTTP 200
```

## Verify the Active Provider

When running with Docker Compose, execute from the `infra` directory:

```bash
docker compose exec genai python -c \
  "from src.config import get_settings; \
from src.providers.factory import create_provider; \
s = get_settings(); \
print(s.provider, type(create_provider()).__name__)"
```

Expected mock output:

```txt
GenAIProvider.MOCK MockProvider
```

Expected OpenAI output:

```txt
GenAIProvider.OPENAI OpenAIProvider
```

Expected Logos output:

```txt
GenAIProvider.LOGOS LogosProvider
```

After changing provider configuration, recreate the GenAI container:

```bash
docker compose \
  --env-file .env \
  up -d --build --force-recreate genai
```

## Monitoring

The GenAI service exposes Prometheus-compatible metrics at:

```txt
/metrics
```

Direct local URL:

```txt
http://localhost:8001/metrics
```

The service uses:

```txt
prometheus-fastapi-instrumentator
```

Prometheus scrapes the service through the internal Docker target:

```txt
genai:8001/metrics
```

Prometheus and Grafana configuration is documented in:

```txt
infra/README.md
```

## Run Tests

Activate the virtual environment:

```bash
source genai/.venv/bin/activate
```

On Git Bash for Windows:

```bash
source genai/.venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r genai/requirements.txt
```

Run all GenAI tests:

```bash
cd genai
pytest
```

Run a specific test file:

```bash
pytest tests/<test-file>.py -v
```

Provider tests must use fake or mocked chat models.

Automated tests must not:

- call the real OpenAI API
- call the real Logos API
- require API keys
- require TUM network access
- consume external API quota

## Logs

When running with Docker Compose:

```bash
cd infra
docker compose logs genai --tail=100
```

Follow the logs:

```bash
docker compose logs -f genai
```

A successful generation request should produce an entry similar to:

```txt
POST /api/v1/genai/generate 200
```

General Docker Compose logging instructions are maintained in:

```txt
infra/README.md
```

## Troubleshooting

### The Wrong Provider Is Active

Verify the active provider:

```bash
cd infra
docker compose exec genai python -c \
  "from src.config import get_settings; \
from src.providers.factory import create_provider; \
s = get_settings(); \
print(s.provider, type(create_provider()).__name__)"
```

Confirm that the correct environment file was edited:

```txt
Standalone service: genai/.env
Complete stack:    infra/.env
```

Recreate the GenAI container after changing the complete-stack configuration:

```bash
docker compose \
  --env-file .env \
  up -d --build --force-recreate genai
```

### OpenAI API Key Is Missing

Confirm that the active environment file contains:

```properties
GENAI_PROVIDER=openai
OPENAI_API_KEY=replace-with-your-api-key
```

Restart or recreate the service after changing configuration.

### OpenAI Authentication Error

An HTTP `401` response usually indicates an invalid or inactive API key.

Check:

- the configured key
- whitespace in the environment value
- whether the correct environment file is being used

### OpenAI Quota Error

An HTTP `429` response may indicate that the OpenAI account has no available API quota or billing balance.

The application cannot resolve provider quota or billing issues.

Use the mock provider for local development when external quota is unavailable.

### Logos Is Unreachable

Check:

- TUM eduVPN connectivity
- `LOGOS_API_KEY`
- `LOGOS_BASE_URL`
- `LOGOS_MODEL`
- GenAI container logs

```bash
cd infra
docker compose logs genai --tail=100
```

The host may have network access while the Docker container does not have access to the same VPN route.

### Invalid Provider Response

External providers may return content that does not match the required schema.

The service must:

- validate the response
- return a controlled application error
- avoid returning unvalidated content
- log enough context for debugging without logging secrets

### Metrics Are Missing

Confirm that the service is running:

```bash
curl http://localhost:8001/genai/health
```

Check the metrics endpoint:

```bash
curl http://localhost:8001/metrics
```

Check GenAI logs:

```bash
cd infra
docker compose logs genai --tail=100
```

## Security

Never commit:

```txt
genai/.env
infra/.env
API keys
JWT tokens
passwords
private credentials
```

Only environment example files should be committed.

Check pending changes before committing:

```bash
git status
```

Avoid logging:

- API keys
- authorization headers
- complete environment variables
- user credentials
- provider secrets

## Development Rules

- Keep FastAPI routes independent from provider-specific logic.
- Select providers through the provider factory.
- Keep the mock provider deterministic.
- Keep `mock` as the default provider.
- Keep API keys outside the repository.
- Validate all provider responses.
- Do not call real external APIs in unit tests.
- Keep the implementation aligned with `api/openapi.yaml`.
- Add or update tests when provider behavior changes.
- Update this README when providers, environment variables, endpoints, dependencies, or setup instructions change.
- Keep complete-stack Docker instructions in `infra/README.md`.