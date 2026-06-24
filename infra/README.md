# Local Infrastructure Setup

This directory contains the Docker Compose setup for running the AI Travel Planner locally.

The setup includes:

* PostgreSQL database
* Auth service
* Trip service
* GenAI service
* Frontend client
* NGINX API Gateway

## Architecture

The API Gateway exposes a single local entrypoint:

```txt
http://localhost:8080
```

The gateway routes external API paths to the internal services:

| External Path     | Internal Target     |
| ----------------- | ------------------- |
| `/api/v1/auth/*`  | `auth-service:8081` |
| `/api/v1/trips/*` | `trip-service:8082` |
| `/api/v1/genai/*` | `genai:8001`        |
| `/genai/health`   | `genai:8001`        |

Auth and Trip services currently use shorter internal paths:

```txt
auth-service: /auth/*
trip-service: /trips/*
```

The gateway rewrites the external versioned paths to the internal service paths.

GenAI already exposes versioned paths directly:

```txt
genai: /api/v1/genai/*
```

## Start the System

From this directory:

```bash
docker compose up --build
```

To stop the system:

```bash
docker compose down
```

To stop the system and remove database volumes:

```bash
docker compose down -v
```

## Verify Running Services

List services:

```bash
docker compose config --services
```

Expected services:

```txt
postgres
auth-service
client
genai
trip-service
gateway
```

Check container status:

```bash
docker compose ps
```

## Verify PostgreSQL

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

Expected tables include:

```txt
auth_users
trips
```

## Verify Gateway Routing

### GenAI Health

```bash
curl http://localhost:8080/genai/health
```

Expected result:

```json
{
  "status": "ok",
  "service": "genai",
  "version": "1.0.0"
}
```

### GenAI Generate

PowerShell:

```powershell
$genaiBody = @{
  destination = "Maastricht"
  days = 2
  preferences = @("old town", "food")
  budget = @{
    amount = 250
    currency = "EUR"
  }
} | ConvertTo-Json -Depth 5

$response = Invoke-RestMethod `
  -Uri "http://localhost:8080/api/v1/genai/generate" `
  -Method Post `
  -ContentType "application/json" `
  -Body $genaiBody

$response | ConvertTo-Json -Depth 10
```

Expected result:

* HTTP 200
* Response contains `summary`
* Response contains `itinerary`
* Response contains `activities`

### Trip Health

PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/trips/health" -Method Get
```

Expected result:

```json
{
  "status": "UP",
  "service": "trip-service"
}
```

### Auth Register

PowerShell:

```powershell
$registerBody = @{
  username = "testuser"
  email = "testuser@example.com"
  password = "Password123!"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/v1/auth/register" `
  -Method Post `
  -ContentType "application/json" `
  -Body $registerBody
```

Expected result:

* HTTP 200
* Response contains a JWT token

### Auth Login

PowerShell:

```powershell
$loginBody = @{
  email = "testuser@example.com"
  password = "Password123!"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/v1/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $loginBody
```

Expected result:

* HTTP 200
* Response contains a JWT token

## Gateway Logs

```bash
docker compose logs gateway --tail=100
```

Useful signs:

```txt
GET /genai/health 200
POST /api/v1/genai/generate 200
GET /api/v1/trips/health 200
POST /api/v1/auth/register 200
POST /api/v1/auth/login 200
```

## Troubleshooting

### PowerShell `curl` issue

On Windows PowerShell, `curl` may point to `Invoke-WebRequest`, not the real curl binary.

Use either:

```powershell
curl.exe http://localhost:8080/genai/health
```

or:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/genai/health" -Method Get
```

### Truncated nested JSON output

PowerShell may display nested JSON objects in a shortened table format.

Use:

```powershell
$response | ConvertTo-Json -Depth 10
```

### Auth or Trip path mismatch

The gateway exposes versioned external paths:

```txt
/api/v1/auth/*
/api/v1/trips/*
```

Internally, the services currently expose:

```txt
/auth/*
/trips/*
```

The gateway handles this with rewrite rules.

### Reset local test data

Do not commit real API keys, JWT tokens, passwords, or private credentials.

Test users created through the local database can be removed by resetting Docker volumes:

```bash
docker compose down -v
docker compose up --build
```
