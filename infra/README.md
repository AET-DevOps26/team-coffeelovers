# Local Infrastructure Setup

This directory contains the Docker Compose setup for running the AI Travel Planner locally.

Use this document for infrastructure-level details: Docker Compose services, API Gateway routing, database checks, service logs, and troubleshooting.

For the short first-time launch guide, see:

```txt
../docs/how-to-launch.md
```

## Included Services

The local Docker Compose setup includes:

* PostgreSQL database
* Auth service
* Trip service
* GenAI service
* Frontend client
* NGINX API Gateway

## API Gateway Architecture

The NGINX API Gateway exposes one local API entrypoint:

```txt
http://localhost:8080
```

The gateway forwards external API paths to internal Docker Compose services:

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

GenAI already exposes versioned API paths directly:

```txt
genai: /api/v1/genai/*
```

## Local URLs

| URL                          | Purpose                  |
| ---------------------------- | ------------------------ |
| `http://localhost:3000`      | Frontend application     |
| `http://localhost:8001/docs` | GenAI Swagger UI         |
| `http://localhost:8080`      | API Gateway root         |
| `http://localhost:8081`      | Auth service direct port |
| `http://localhost:8082`      | Trip service direct port |
| `localhost:5432`             | PostgreSQL database port |

A `404` or `403` on a backend root URL does not necessarily mean the service is broken. Use the frontend or the documented API endpoints for verification.

## Terminal Recommendation

The command examples use `curl`.

Recommended terminals:

* Git Bash
* WSL
* Linux terminal
* macOS terminal

The multiline `curl` examples use `\` for line continuation. This works in Unix-style shells, but not directly in Windows PowerShell.

If you are using Windows, run the examples from Git Bash or WSL.

## Start the System

From this directory:

```bash
docker compose up --build
```

Or from the repository root:

```bash
docker compose -f infra/docker-compose.yml up --build
```

## Stop the System

From this directory:

```bash
docker compose down
```

To stop the system and remove local database volumes:

```bash
docker compose down -v
```

Use `docker compose down -v` when you want to reset local test data.

## Check Docker Compose Services

List configured services:

```bash
docker compose config --services
```

Expected result includes:

```txt
postgres
auth-service
client
genai
trip-service
gateway
```

Check running containers:

```bash
docker compose ps
```

Expected result:

* The main application containers are listed.
* Running services should show an active/running state.
* If health checks are configured, healthy services should show a healthy status.

## Check PostgreSQL

Check database readiness:

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

Expected result includes project tables such as:

```txt
auth_users
trips
```

## Check API Gateway Routes

Use the API Gateway for local API testing:

```txt
http://localhost:8080
```

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

### Trip Health

```bash
curl http://localhost:8080/api/v1/trips/health
```

Expected result:

```json
{
  "status": "UP",
  "service": "trip-service"
}
```

### GenAI Generate

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
* Response contains `summary`
* Response contains `itinerary`
* Response contains `activities`

### Auth Register

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

Expected result:

* HTTP 200
* Response contains authentication data such as a JWT token.

If the same email was already registered, use a different email address or reset the local database volume.

### Auth Login

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
* Response contains authentication data such as a JWT token.

## Logs

Show recent gateway logs:

```bash
docker compose logs gateway --tail=100
```

Expected result:

* Recent gateway access/error logs are printed.
* Successful requests should show status codes such as `200`.

Useful signs:

```txt
GET /genai/health 200
POST /api/v1/genai/generate 200
GET /api/v1/trips/health 200
POST /api/v1/auth/register 200
POST /api/v1/auth/login 200
```

Follow gateway logs live:

```bash
docker compose logs -f gateway
```

Show recent logs for individual services:

```bash
docker compose logs auth-service --tail=100
docker compose logs trip-service --tail=100
docker compose logs genai --tail=100
docker compose logs client --tail=100
docker compose logs postgres --tail=100
```

Expected result:

* The selected service logs are printed.
* Use these logs to debug startup errors, failed API calls, and routing issues.

## Troubleshooting

### Browser shows 404 or 403

This can be normal for API-only services.

Use these pages for browser checks:

```txt
http://localhost:3000
http://localhost:8001/docs
```

Use API endpoints for backend checks:

```bash
curl http://localhost:8080/genai/health
curl http://localhost:8080/api/v1/trips/health
```

### Windows PowerShell and curl

The `curl` examples in this document use Unix-style line continuation with `\`.

This works in:

* Git Bash
* WSL
* Linux terminal
* macOS terminal

It does not work directly in Windows PowerShell.

For Windows users, Git Bash or WSL is recommended for the JSON POST examples.

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

### GenAI path mismatch

The GenAI service exposes versioned paths directly:

```txt
/api/v1/genai/*
```

Through the gateway, use:

```txt
http://localhost:8080/api/v1/genai/*
```

For health checks, use:

```txt
http://localhost:8080/genai/health
```

### Port already in use

If a container fails because a port is already in use, check whether another local process is using one of these ports:

* `3000`
* `5432`
* `8001`
* `8080`
* `8081`
* `8082`

Stop the conflicting process or change the local port mapping in Docker Compose.

### Reset local test data

Do not commit real API keys, JWT tokens, passwords, or private credentials.

Test users and database records created locally can be removed by resetting Docker volumes:

```bash
docker compose down -v
docker compose up --build
```

Expected result:

* Containers are recreated.
* PostgreSQL volume data is removed.
* Previously registered local users and saved local data are deleted.

### Rebuild from scratch

If containers behave unexpectedly after dependency or Dockerfile changes, rebuild from scratch:

```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

Expected result:

* Old containers and database volumes are removed.
* Docker images are rebuilt without cache.
* The local system starts from a clean state.

```
```
