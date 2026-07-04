# GenAI Service

The GenAI service is the independent Python/FastAPI microservice of the AI Travel Planner project.

It exposes API endpoints used to generate travel itineraries and travel-related suggestions. The service is designed to support multiple generation providers through a provider-based architecture.

The default provider is a deterministic mock provider, so the service can run locally and in CI without external API keys. OpenAI support can be enabled explicitly through environment variables.

## Purpose

The GenAI service is responsible for:

* generating personalized day-by-day travel itineraries,
* supporting a stable API contract for backend integration,
* keeping LLM provider logic separate from FastAPI route handlers,
* supporting mock-based local development and CI,
* preparing the project for OpenAI, Logos, and future local model providers.

## Structure

```txt
genai/
├── src/
│   ├── main.py
│   ├── config.py
│   ├── prompts.py
│   ├── schemas.py
│   ├── providers/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── factory.py
│   │   ├── mock_provider.py
│   │   └── openai_provider.py
│   ├── routers/
│   │   ├── __init__.py
│   │   └── genai.py
│   └── services/
│       ├── __init__.py
│       └── itinerary_service.py
├── tests/
├── requirements.txt
├── .env.example
├── .gitignore
├── .dockerignore
└── Dockerfile
```

## Requirements

* Python 3.12
* pip
* Docker, optional for containerized execution

## Local Setup

Create and activate a virtual environment from the repository root:

```bash
python -m venv .venv
source .venv/Scripts/activate
```

On Windows PowerShell, activation can also be done with:

```bash
.venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r genai/requirements.txt
```

Run the service locally:

```bash
cd genai
uvicorn src.main:app --reload --port 8001
```

The service runs on:

```bash
http://127.0.0.1:8001
```

Swagger UI is available at:

```bash
http://127.0.0.1:8001/docs
```

## Available Endpoints

| Method | Endpoint                 | Description                                    |
| ------ | ------------------------ | ---------------------------------------------- |
| GET    | `/genai/health`          | Returns service health status                  |
| POST   | `/api/v1/genai/generate` | Generates a personalized day-by-day itinerary  |
| POST   | `/api/v1/genai/suggest`  | Suggests travel preferences and activity ideas |
| GET    | `/docs`                  | Opens FastAPI Swagger documentation            |

## API Gateway Access

When the full local stack is running through Docker Compose, the recommended local entrypoint is the API Gateway:

```bash
http://localhost:8080
```

Gateway routes:

| External Route    | Internal Target |
| ----------------- | --------------- |
| `/api/v1/genai/*` | `genai:8001`    |
| `/genai/health`   | `genai:8001`    |

From the host machine, use:

```bash
http://localhost:8080/api/v1/genai/generate
```

Inside Docker Compose, other services can reach GenAI directly through the compose service name:

```bash
http://genai:8001
```

For example, backend service-to-service calls should use:

```bash
http://genai:8001/api/v1/genai/generate
```

## Provider Configuration

The GenAI service supports provider selection through environment variables.

| Provider | Status      | Description                                                   |
| -------- | ----------- | ------------------------------------------------------------- |
| `mock`   | Implemented | Deterministic local provider for development, testing, and CI |
| `openai` | Implemented | OpenAI provider through LangChain                             |
| `logos`  | Planned     | TUM Logos OpenAI-compatible provider                          |

Default mode:

```env
GENAI_PROVIDER=mock
```

Mock mode does not require any API key.

## Environment Variables

Copy the example environment file if local configuration is needed:

```bash
cd genai
cp .env.example .env
```

Recommended `.env.example` values:

```env
GENAI_PROVIDER=mock
GENAI_LOG_LEVEL=INFO

OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini

LOGOS_API_KEY=
LOGOS_BASE_URL=https://logos.aet.cit.tum.de/v1
LOGOS_MODEL=openai/gpt-oss-120b
```

Do not commit real API keys, JWT tokens, or private credentials.

## Mock Provider

The mock provider is the default provider.

It is used for:

* local development,
* CI tests,
* backend integration before external LLM providers are enabled,
* deterministic API contract verification.

Run with mock provider:

```bash
cd genai
GENAI_PROVIDER=mock uvicorn src.main:app --reload --port 8001
```

## OpenAI Provider

The OpenAI provider uses LangChain and `langchain-openai`.

To test OpenAI locally, set the required environment variables:

```bash
export GENAI_PROVIDER=openai
export OPENAI_API_KEY="<your-local-api-key>"
export OPENAI_BASE_URL="https://api.openai.com/v1"
export OPENAI_MODEL="gpt-4o-mini"
```

Then run:

```bash
cd genai
uvicorn src.main:app --reload --port 8001
```

In a second terminal, send a test request to the local GenAI endpoint:

```bash
curl -X POST http://127.0.0.1:8001/api/v1/genai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Maastricht",
    "days": 2,
    "preferences": ["old town", "food"],
    "budget": {
      "amount": 250,
      "currency": "EUR"
    }
  }'
```

Expected result:

- HTTP 200
- response contains summary
- response contains itinerary
- response contains activities
- response is generated by the configured OpenAI model, not by the deterministic mock provider

Do not print, commit, or share the real API key.

Unit tests do not call the real OpenAI API. OpenAI provider tests use fake or mocked chat models.

## Logos Provider

Logos support is planned as a future provider.

Expected configuration:

```env
GENAI_PROVIDER=logos
LOGOS_API_KEY=
LOGOS_BASE_URL=https://logos.aet.cit.tum.de/v1
LOGOS_MODEL=openai/gpt-oss-120b
```

Logos requires access to the TUM network or eduVPN.

## Docker Usage

Build the Docker image:

```bash
cd genai
docker build -t genai-service .
```

Run the container in mock mode:

```bash
docker run --rm -p 8001:8001 \
  -e GENAI_PROVIDER=mock \
  genai-service
```

Run the container with OpenAI enabled:

```bash
docker run --rm -p 8001:8001 \
  -e GENAI_PROVIDER=openai \
  -e OPENAI_API_KEY="$OPENAI_API_KEY" \
  -e OPENAI_BASE_URL="https://api.openai.com/v1" \
  -e OPENAI_MODEL="gpt-4o-mini" \
  genai-service
```

Then open:

```bash
http://127.0.0.1:8001/genai/health
http://127.0.0.1:8001/docs
```

## Docker Compose

The GenAI service is included in the local Docker Compose setup under `infra/docker-compose.yml`.

The service defaults to mock mode:

```env
GENAI_PROVIDER=mock
```

This keeps the full local stack reproducible without requiring external API keys.

To run the full stack:

```bash
cd infra
docker compose up --build
```

To test OpenAI through Docker Compose, export the variables before starting the stack:

```bash
export GENAI_PROVIDER=openai
export OPENAI_API_KEY="<your-local-api-key>"
export OPENAI_BASE_URL="https://api.openai.com/v1"
export OPENAI_MODEL="gpt-4o-mini"

cd infra
docker compose up --build genai
```

For deployed environments, `OPENAI_API_KEY` must be provided through secrets, not committed files.

## Run Tests

Install dependencies:

```bash
cd genai
pip install -r requirements.txt
```

Run tests:

```bash
pytest
```

Expected result:

```bash
All tests pass.
```

The test suite verifies:

* health endpoint behavior,
* mock generate endpoint behavior,
* mock suggest endpoint behavior,
* request validation errors,
* provider configuration,
* prompt formatting,
* OpenAI provider behavior with fake models.

Tests must not call the real OpenAI API.

## Manual Endpoint Verification

Start the service locally:

```bash
cd genai
uvicorn src.main:app --reload --port 8001
```

Health check:

```bash
curl http://127.0.0.1:8001/genai/health
```

Generate itinerary:

```bash
curl -X POST http://127.0.0.1:8001/api/v1/genai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Maastricht",
    "days": 2,
    "preferences": ["old town", "food"],
    "budget": {
      "amount": 250,
      "currency": "EUR"
    }
  }'
```

Expected result:

* HTTP 200
* response contains `summary`
* response contains `itinerary`
* response contains `activities`

## Gateway Verification

With Docker Compose running from `infra/`:

```bash
curl http://localhost:8080/genai/health
```

Generate through the gateway:

```bash
curl -X POST http://localhost:8080/api/v1/genai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Maastricht",
    "days": 2,
    "preferences": ["old town", "food"],
    "budget": {
      "amount": 250,
      "currency": "EUR"
    }
  }'
```

## Troubleshooting

### OpenAI API key missing

If `GENAI_PROVIDER=openai` is set but no API key is provided, the service should fail clearly with an error explaining that `OPENAI_API_KEY` is required.

Fix:

```bash
export OPENAI_API_KEY="<your-local-api-key>"
```

Or switch back to mock mode:

```bash
export GENAI_PROVIDER=mock
```

### OpenAI quota or billing error

If OpenAI returns a quota or billing error, check the OpenAI Platform billing and usage settings.

Mock mode can still be used without API access:

```bash
export GENAI_PROVIDER=mock
```

### Docker Compose service URL confusion

From the host machine, use:

```bash
http://localhost:8080/api/v1/genai/generate
```

Inside Docker Compose, use:

```bash
http://genai:8001/api/v1/genai/generate
```

Do not use `localhost:8001` from another container, because `localhost` inside a container refers to that same container.

### Reset local Docker data

To stop the local stack:

```bash
cd infra
docker compose down
```

To remove local database volumes as well:

```bash
docker compose down -v
```

## Development Notes

* Keep the FastAPI route handlers independent from provider-specific code.
* Use the provider factory to select the active provider.
* Keep mock mode as the default provider.
* Do not require OpenAI credentials for CI.
* Do not make real external API calls in unit tests.
* Keep the OpenAPI contract aligned with `api/openapi.yaml`.
