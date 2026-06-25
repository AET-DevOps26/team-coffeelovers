# How to Launch the Project Locally

This guide explains how to start the AI Travel Planner project from a fresh clone.

The recommended local setup uses Docker Compose and starts the application stack through the infrastructure configuration in `infra/`.

## What Starts Locally

The Docker Compose setup starts the main local system components:

* React frontend client
* Auth service
* Trip service
* GenAI service
* PostgreSQL database
* NGINX API Gateway

The API Gateway is the recommended local entrypoint for API calls:

```txt
http://localhost:8080
```

## Prerequisites

Install:

* Docker
* Docker Compose plugin

Check that Docker is running:

```bash
docker --version
docker compose version
```

## 1. Clone the Repository

```bash
git clone https://github.com/AET-DevOps26/team-coffeelovers.git
cd team-coffeelovers
```

## 2. Start the Full Local System

From the repository root:

```bash
cd infra
docker compose up --build
```

Alternative from the repository root without changing directories:

```bash
docker compose -f infra/docker-compose.yml up --build
```

The first startup can take some time because Docker needs to build the service images and download dependencies.

## 3. Check Running Containers

From the `infra/` directory:

```bash
docker compose ps
```

You can also list the configured services:

```bash
docker compose config --services
```

Expected services include:

```txt
postgres
auth-service
trip-service
genai
client
gateway
```

## 4. Local URLs

| Component        | URL                          | Description                              |
| ---------------- | ---------------------------- | ---------------------------------------- |
| Frontend client  | `http://localhost:3000`      | React frontend                           |
| API Gateway      | `http://localhost:8080`      | Main local API entrypoint                |
| Auth service     | `http://localhost:8081`      | Direct auth service access for debugging |
| Trip service     | `http://localhost:8082`      | Direct trip service access for debugging |
| GenAI service    | `http://localhost:8001`      | Direct GenAI service access              |
| GenAI Swagger UI | `http://localhost:8001/docs` | FastAPI documentation                    |
| PostgreSQL       | `localhost:5432`             | Local database                           |

Use `http://localhost:8080` for normal API testing.

## 5. API Gateway Routes

| External Gateway Route | Internal Target     |
| ---------------------- | ------------------- |
| `/api/v1/auth/*`       | `auth-service:8081` |
| `/api/v1/trips/*`      | `trip-service:8082` |
| `/api/v1/genai/*`      | `genai:8001`        |
| `/genai/health`        | `genai:8001`        |

The gateway rewrites the external versioned auth and trip paths to the current internal service paths.

## 6. Verify GenAI Service

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

Test itinerary generation:

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

Expected result:

* HTTP 200
* response contains `summary`
* response contains `itinerary`
* response contains `activities`

## 7. Verify Trip Service

```bash
curl http://localhost:8080/api/v1/trips/health
```

Expected response:

```json
{
  "status": "UP",
  "service": "trip-service"
}
```

## 8. Verify Auth Service

Register a local test user:

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

Login with the same user:

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

Expected result:

* HTTP 200
* response contains authentication data such as a token

## 9. Verify PostgreSQL

From the `infra/` directory:

```bash
docker compose exec postgres pg_isready -U coffeelovers
```

Expected result:

```txt
accepting connections
```

List database tables:

```bash
docker compose exec postgres psql -U coffeelovers -d coffeelovers -c "\dt"
```

Expected tables include project tables such as:

```txt
auth_users
trips
```

## 10. View Logs

All services:

```bash
docker compose logs -f
```

Only gateway logs:

```bash
docker compose logs gateway --tail=100
```

Only GenAI logs:

```bash
docker compose logs genai --tail=100
```

Only Trip service logs:

```bash
docker compose logs trip-service --tail=100
```

Only Auth service logs:

```bash
docker compose logs auth-service --tail=100
```

## 11. Stop the System

From the `infra/` directory:

```bash
docker compose down
```

Stop and remove local database volumes:

```bash
docker compose down -v
```

Use `docker compose down -v` when you want to reset local test data.

## 12. Windows PowerShell Notes

In Windows PowerShell, `curl` may resolve to `Invoke-WebRequest`.

Use one of the following instead:

```powershell
curl.exe http://localhost:8080/genai/health
```

or:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/genai/health" -Method Get
```

For nested JSON output, use:

```powershell
$response | ConvertTo-Json -Depth 10
```

## 13. Troubleshooting

### Containers do not start

Check Docker is running:

```bash
docker info
```

Rebuild from scratch:

```bash
docker compose down -v
docker compose up --build
```

### Port already in use

Check whether another local process already uses one of these ports:

* `3000`
* `8080`
* `8081`
* `8082`
* `8001`
* `5432`

Stop the conflicting process or update the local compose port mapping.

### Auth or Trip path mismatch

Use the gateway paths for local API testing:

```txt
/api/v1/auth/*
/api/v1/trips/*
```

The gateway forwards these requests to the internal service paths.

### GenAI returns deterministic output

The GenAI service currently supports a mock provider mode for local development and CI. This keeps the API contract testable without requiring a real external LLM key.

## Kubernetes Deployment

For Kubernetes deployment instructions, see:

```txt
infra/helm/README.md
```
