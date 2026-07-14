# GenAI Service

The GenAI service is the independent Python/FastAPI microservice of the AI Travel Planner application.

It generates personalized travel itineraries and supports multiple LLM providers through a provider-based architecture.

Supported providers:

| Provider | Status | Purpose |
| --- | --- | --- |
| `mock` | Implemented | Deterministic local development and CI |
| `openai` | Implemented | OpenAI models through LangChain |
| `logos` | Implemented | TUM Logos through its OpenAI-compatible API |

The default provider is `mock`, so the service and CI can run without external API credentials.

---

## Architecture

```txt
HTTP request
    ↓
FastAPI router
    ↓
Itinerary service
    ↓
Provider factory
    ↓
MockProvider / OpenAIProvider / LogosProvider
    ↓
Prompt formatting
    ↓
Response validation
    ↓
HTTP response
```

The active provider is selected through environment variables. No API route or application code changes are required when switching providers.

---

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
├── .env.example
├── requirements.txt
├── Dockerfile
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/genai/health` | Returns the GenAI service status |
| `POST` | `/api/v1/genai/generate` | Generates a structured travel itinerary |
| `POST` | `/api/v1/genai/suggest` | Returns travel preference suggestions |
| `GET` | `/docs` | Opens FastAPI Swagger UI |

The public API contract remains the same for all providers.

---

# Environment Configuration

Create a local environment file:

```txt
genai/.env
```

Use one provider configuration at a time.

## Mock Provider

```env
GENAI_PROVIDER=mock
GENAI_LOG_LEVEL=INFO
```

Mock mode:

- does not require an API key,
- does not call an external LLM,
- is used by default,
- is suitable for local development and CI.

---

## OpenAI Provider

```env
GENAI_PROVIDER=openai
GENAI_LOG_LEVEL=INFO

OPENAI_API_KEY=<your-openai-api-key>
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

The OpenAI provider uses LangChain and `langchain-openai`.

Do not commit, print, or share the API key.

---

## Logos Provider

```env
GENAI_PROVIDER=logos
GENAI_LOG_LEVEL=INFO

LOGOS_API_KEY=<your-lg-key>
LOGOS_BASE_URL=https://logos.aet.cit.tum.de/v1
LOGOS_MODEL=openai/gpt-oss-120b
```

Logos uses an OpenAI-compatible API.

Important:

- the API key normally starts with `lg-`,
- the model name must include the `openai/` prefix,
- the base URL must include `/v1`,
- TUM network access is required,
- connect to eduVPN when working outside the TUM network.

Do not commit or share the Logos API key.

---

# Local Development

## Requirements

Install:

- Python 3.12
- pip

Create a virtual environment from the repository root:

```bash
python -m venv genai/.venv
```

Activate it:

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

Start the GenAI service:

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

---

# Run the Complete Application with Docker Compose

Docker Compose is the recommended way to start the complete application.

The following services are started:

- React frontend,
- Auth service,
- Trip service,
- GenAI service,
- PostgreSQL,
- NGINX API Gateway.

## Requirements

Install and start:

- Docker
- Docker Compose

For Logos, connect to TUM eduVPN before starting Docker.

---

## Start the Complete Application

From the repository root:

```bash
cd infra
docker compose up --build --force-recreate
```

Docker Compose reads the provider configuration from:

```txt
infra/.env
```

Keep the terminal open while using the application.

Check the running services:

```bash
docker compose ps
```

Expected services:

```txt
postgres
auth-service
trip-service
genai
gateway
client
```

---

## Application URLs

| Component | URL |
| --- | --- |
| Frontend UI | `http://localhost:3000` |
| API Gateway | `http://localhost:8080` |
| GenAI direct API | `http://localhost:8001` |
| GenAI Swagger UI | `http://localhost:8001/docs` |
| Auth service | `http://localhost:8081` |
| Trip service | `http://localhost:8082` |

Use the frontend for the normal application workflow.

Use the API Gateway for manual API testing.

---

# Test through the User Interface

Open:

```txt
http://localhost:3000
```

Use the travel planning workflow:

1. Enter a destination.
2. Select the travel duration.
3. Select travel preferences.
4. Enter a budget when available.
5. Generate the itinerary.

Expected application flow:

```txt
Frontend
    ↓
Trip service
    ↓
GenAI service
    ↓
Configured provider
    ↓
Generated itinerary
    ↓
Frontend
```

To verify that the UI request reaches GenAI, open another terminal:

```bash
cd infra
docker compose logs -f genai
```

Generate an itinerary from the UI.

A successful request should produce a log similar to:

```txt
POST /api/v1/genai/generate 200
```

If no request appears in the GenAI logs, the frontend or Trip service is not reaching the GenAI service.

---

# Verify the Active Provider

From the `infra` directory:

```bash
docker compose exec genai python -c "from src.config import get_settings; from src.providers.factory import create_provider; s=get_settings(); print(s.provider, type(create_provider()).__name__)"
```

Expected output for mock:

```txt
GenAIProvider.MOCK MockProvider
```

Expected output for OpenAI:

```txt
GenAIProvider.OPENAI OpenAIProvider
```

Expected output for Logos:

```txt
GenAIProvider.LOGOS LogosProvider
```

---

# Test through the Terminal

The recommended local API entrypoint is the API Gateway:

```txt
http://localhost:8080
```

## Health Check

```bash
curl http://localhost:8080/genai/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "genai",
  "version": "1.0.0"
}
```

---

## Generate an Itinerary

```bash
curl -X POST \
  http://localhost:8080/api/v1/genai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Maastricht",
    "days": 2,
    "preferences": [
      "old town",
      "local food",
      "photo spots"
    ],
    "budget": {
      "amount": 250,
      "currency": "EUR"
    }
  }'
```

Expected response fields:

```txt
summary
itinerary
activities
```

---

# Test through Swagger UI

Open:

```txt
http://localhost:8001/docs
```

Select:

```txt
POST /api/v1/genai/generate
```

Click:

```txt
Try it out
```

Use:

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

Click:

```txt
Execute
```

Expected result:

```txt
HTTP 200
```

---

# Run Tests

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

Run only OpenAI provider tests:

```bash
pytest tests/test_openai_provider.py -v
```

Run only Logos provider tests:

```bash
pytest tests/test_logos_provider.py -v
```

The tests use fake or mocked chat models.

They do not:

- call the real OpenAI API,
- call the real Logos API,
- require API keys,
- require TUM network access,
- consume external API quota.

---

# View Logs

Show recent GenAI logs:

```bash
cd infra
docker compose logs genai --tail=100
```

Follow GenAI logs:

```bash
docker compose logs -f genai
```

Show API Gateway logs:

```bash
docker compose logs gateway --tail=100
```

Show all service logs:

```bash
docker compose logs --tail=100
```

---

# Stop the Application

Stop all containers:

```bash
cd infra
docker compose down
```

Stop the containers and remove local database volumes:

```bash
docker compose down -v
```

Use `down -v` only when local database data should be deleted.

---

# Troubleshooting

## Docker Engine Is Not Running

Error:

```txt
failed to connect to the docker API
dockerDesktopLinuxEngine
```

Start Docker Desktop and verify:

```bash
docker ps
```

---

## Docker Compose Cannot Find the Configuration

Error:

```txt
no configuration file provided
```

Run Docker Compose from the `infra` directory:

```bash
cd infra
```

Or specify the Compose file explicitly:

```bash
docker compose \
  -f infra/docker-compose.yml \
  --env-file genai/.env \
  up --build
```

---

## The Mock Provider Is Still Active

Verify the selected provider:

```bash
cd infra

docker compose exec genai python -c "from src.config import get_settings; from src.providers.factory import create_provider; s=get_settings(); print(s.provider, type(create_provider()).__name__)"
```

Recreate the containers after changing `genai/.env`:

```bash
docker compose down

docker compose \
  --env-file ../genai/.env \
  up --build --force-recreate
```

---

## OpenAI API Key Is Missing

Check that `genai/.env` contains:

```env
GENAI_PROVIDER=openai
OPENAI_API_KEY=<your-api-key>
```

Restart the containers after changing the file.

---

## OpenAI Authentication or Quota Error

Possible errors:

```txt
401 invalid_api_key
```

The API key is invalid or inactive.

```txt
429 insufficient_quota
```

The OpenAI account has no available API quota or billing.

---

## Logos Is Unreachable

Check:

- TUM eduVPN is connected,
- `LOGOS_API_KEY` is valid,
- the base URL includes `/v1`,
- the model is `openai/gpt-oss-120b`.

Inspect the GenAI logs:

```bash
cd infra
docker compose logs genai --tail=100
```

---

## Docker Cannot Reach Logos through eduVPN

The host computer may reach Logos while the Docker container cannot use the VPN route.

First test Logos outside Docker.

Then inspect the container logs:

```bash
cd infra
docker compose logs genai --tail=100
```

---

# Security

Never commit:

```txt
genai/.env
infra/.env
API keys
JWT tokens
private credentials
```

Only `.env.example` should be committed.

Verify before committing:

```bash
git status
```

---

# Development Rules

- Keep FastAPI routes independent from provider-specific logic.
- Select providers through the provider factory.
- Keep `mock` as the default provider.
- Keep API keys outside the repository.
- Do not call real external APIs in unit tests.
- Keep tests passing before opening a pull request.
- Update this README when providers, environment variables, dependencies, endpoints, or setup instructions change.
- Keep the implementation aligned with `api/openapi.yaml`.