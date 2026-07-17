# Local Infrastructure Setup

This document describes the Docker Compose infrastructure used to run the AI Travel Planner locally.

It covers:

- environment configuration
- service startup and shutdown
- local ports
- API Gateway routing
- PostgreSQL checks
- Prometheus and Grafana
- service logs
- common infrastructure troubleshooting

For the short first-time launch guide, see:

```txt
../docs/how-to-launch.md
```

## Included Services

The local Docker Compose stack includes:

- PostgreSQL
- Auth Service
- Trip Service
- GenAI Service
- React Client
- NGINX API Gateway
- Prometheus
- Grafana

## Local URLs

| Component | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Grafana | `http://localhost:3001` |
| GenAI Service | `http://localhost:8001` |
| GenAI Swagger UI | `http://localhost:8001/docs` |
| API Gateway | `http://localhost:8080` |
| Auth Service | `http://localhost:8081` |
| Trip Service | `http://localhost:8082` |
| Prometheus | `http://localhost:9090` |
| PostgreSQL | `localhost:5432` |

Use the API Gateway for normal application requests.

Direct service ports are primarily intended for development and debugging.

A `404` or `403` response from a service root URL does not necessarily mean that the service is unavailable. Use the documented health, API, or metrics endpoints for verification.

## API Gateway

The NGINX API Gateway provides one local entrypoint:

```txt
http://localhost:8080
```

It forwards external paths to internal Docker Compose services:

| External Path | Internal Target |
|---|---|
| `/api/v1/auth/*` | `auth-service:8081` |
| `/api/v1/trips/*` | `trip-service:8082` |
| `/api/v1/genai/*` | `genai:8001` |
| `/genai/health` | `genai:8001` |

Auth and Trip use shorter internal paths:

```txt
Auth Service: /auth/*
Trip Service: /trips/*
```

NGINX rewrites the external versioned paths where required.

Gateway configuration is stored under:

```txt
nginx/
```

## Environment Configuration

Docker Compose reads local configuration from:

```txt
infra/.env
```

From the `infra` directory, create the environment file from the repository example:

```bash
cp ../.env.example .env
```

Review the copied values before starting the stack.

At minimum, configure valid local values for:

- PostgreSQL
- authentication and JWT
- GenAI provider
- Grafana administrator credentials

Example local GenAI configuration:

```properties
GENAI_PROVIDER=mock
GENAI_LOG_LEVEL=INFO
```

Example Grafana configuration:

```properties
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=replace-with-a-local-password
```

Provider-specific GenAI settings are documented in:

```txt
../genai/README.md
```

Do not commit:

- `.env`
- API keys
- passwords
- JWT secrets
- tokens
- private credentials

## Validate the Configuration

From the `infra` directory:

```bash
docker compose --env-file .env config
```

List the configured services:

```bash
docker compose --env-file .env config --services
```

Expected services:

```txt
postgres
auth-service
trip-service
genai
client
gateway
prometheus
grafana
```

The exact display order may differ.

## Start the System

From the `infra` directory:

```bash
docker compose --env-file .env up --build
```

Run in the background:

```bash
docker compose --env-file .env up --build -d
```

From the repository root, use:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  up --build
```

Check the running containers:

```bash
docker compose ps
```

## Stop the System

From the `infra` directory:

```bash
docker compose down
```

This stops the containers but preserves named volumes.

Remove containers and local volumes:

```bash
docker compose down -v
```

The `-v` option removes persistent local data, including:

- PostgreSQL data
- registered local users
- saved trips
- Prometheus data
- Grafana data

Use it only when a complete local reset is intended.

## PostgreSQL

### Check Readiness

```bash
docker compose exec postgres \
  pg_isready -U coffeelovers
```

Expected result:

```txt
accepting connections
```

### List Tables

```bash
docker compose exec postgres \
  psql -U coffeelovers -d coffeelovers -c "\dt"
```

The command lists the tables currently available in the configured database and schema search path.

## API Verification

### GenAI Health

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

### Trip Service Health

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

### Generate an Itinerary

The GenAI endpoint can be tested independently through the API Gateway:

```bash
curl -X POST http://localhost:8080/api/v1/genai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Maastricht",
    "days": 2,
    "preferences": ["old town", "food"]
  }'
```

Expected result:

- HTTP `200`
- response contains a trip summary
- response contains a structured itinerary
- response contains activities grouped by day

The GenAI API also supports optional budget information. Budget is not currently part of the complete frontend and backend user workflow.

For the complete request and response contract, see:

```txt
../api/openapi.yaml
```

### Register a User

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

Use a different email address if the test user already exists.

### Log In

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

A successful response should contain the authentication information required by the frontend.

## Monitoring

Prometheus collects metrics from the application services. Grafana uses Prometheus as its default datasource.

```txt
Auth Service ----+
Trip Service ----+----> Prometheus ----> Grafana
GenAI Service ---+
```

## Prometheus

Prometheus is available at:

```txt
http://localhost:9090
```

Target status is available at:

```txt
http://localhost:9090/targets
```

Expected jobs:

```txt
prometheus
auth-service
trip-service
genai
```

All active targets should normally report `UP`.

Prometheus scrape configuration:

```txt
monitoring/prometheus/prometheus.yml
```

### Metrics Endpoints

| Service | Host Endpoint | Docker Scrape Target |
|---|---|---|
| Auth Service | `http://localhost:8081/auth/actuator/prometheus` | `auth-service:8081/auth/actuator/prometheus` |
| Trip Service | `http://localhost:8082/actuator/prometheus` | `trip-service:8082/actuator/prometheus` |
| GenAI Service | `http://localhost:8001/metrics` | `genai:8001/metrics` |

Direct checks:

```bash
curl http://localhost:8081/auth/actuator/prometheus
curl http://localhost:8082/actuator/prometheus
curl http://localhost:8001/metrics
```

Restart Prometheus after scrape configuration changes:

```bash
docker compose restart prometheus
```

## Grafana

Grafana is available at:

```txt
http://localhost:3001
```

Administrator credentials are configured in:

```txt
infra/.env
```

Prometheus is provisioned automatically as Grafana's default datasource.

Datasource configuration:

```txt
monitoring/grafana/provisioning/datasources/prometheus.yml
```

The datasource URL must use the Docker service name:

```txt
http://prometheus:9090
```

Do not use `localhost` as the datasource URL. Inside the Grafana container, `localhost` refers to Grafana itself.

## Grafana Dashboard

The application monitoring dashboard is provisioned automatically from:

```txt
monitoring/grafana/dashboards/application-monitoring.json
```

Dashboard provisioning configuration:

```txt
monitoring/grafana/provisioning/dashboards/dashboards.yml
```

Open the dashboard from:

```txt
Dashboards
→ AI Travel Planner
→ AI Travel Planner Monitoring
```

The dashboard includes:

- service availability
- HTTP request rate
- HTTP error rate
- average HTTP request latency

### Verify the Datasource

Open Grafana, select **Explore**, choose the Prometheus datasource, and run:

```promql
up
```

Expected active targets:

```txt
up{job="prometheus"} 1
up{job="auth-service"} 1
up{job="trip-service"} 1
up{job="genai"} 1
```

A value of `1` means Prometheus can scrape the target.

A value of `0` means the target is currently unavailable to Prometheus.

### Apply Grafana Provisioning Changes

After changing the datasource or dashboard provisioning files:

```bash
docker compose \
  --env-file .env \
  up -d --force-recreate grafana
```

Check Grafana logs:

```bash
docker compose logs grafana --tail=100
```

## Logs

Show recent logs:

```bash
docker compose logs gateway --tail=100
docker compose logs auth-service --tail=100
docker compose logs trip-service --tail=100
docker compose logs genai --tail=100
docker compose logs client --tail=100
docker compose logs postgres --tail=100
docker compose logs prometheus --tail=100
docker compose logs grafana --tail=100
```

Follow one service continuously:


```bash
docker compose logs -f gateway
```

Replace `gateway` with another service name when needed.

Show recent logs for the complete stack:

```bash
docker compose logs --tail=100
```

## Troubleshooting

### Docker Compose Cannot Find the Environment File

Confirm that this file exists:

```txt
infra/.env
```

When running from the `infra` directory:

```bash
docker compose --env-file .env up --build
```

When running from the repository root:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  up --build
```

Environment file paths are resolved relative to the current command context. Do not use `genai/.env` for the complete Docker Compose stack unless the Compose configuration is intentionally designed for it.

### A Service Does Not Start

Check the container state:

```bash
docker compose ps
```

Check the service logs:

```bash
docker compose logs <service-name> --tail=100
```

Recreate the affected service:

```bash
docker compose \
  --env-file .env \
  up -d --build --force-recreate <service-name>
```

### Prometheus Target Is Down

Open:

```txt
http://localhost:9090/targets
```

Review the error shown for the failed target.

Then:

1. confirm that the service container is running
2. check the service logs
3. call its metrics endpoint directly
4. verify the scrape path in `prometheus.yml`
5. restart Prometheus after configuration changes

```bash
docker compose restart prometheus
```

### Auth Metrics Return `403`

Confirm that the Auth Service permits access to:

```txt
/auth/actuator/prometheus
```

Rebuild the service after changing its security or monitoring configuration:

```bash
docker compose build --no-cache auth-service
docker compose \
  --env-file .env \
  up -d --force-recreate auth-service
```

Auth-specific Spring Security and Actuator configuration should be maintained in the Auth Service configuration rather than duplicated in this infrastructure guide.

### Grafana Cannot Connect to Prometheus

Check both services:

```bash
docker compose ps grafana prometheus
```

Confirm that the datasource URL is:

```txt
http://prometheus:9090
```

Check Grafana logs:

```bash
docker compose logs grafana --tail=100
```

Recreate Grafana after provisioning changes:

```bash
docker compose \
  --env-file .env \
  up -d --force-recreate grafana
```

### Port Already in Use

The local stack uses:

```txt
3000
3001
5432
8001
8080
8081
8082
9090
```

Stop the conflicting process or change the relevant host port mapping in `docker-compose.yml`.

### Rebuild One Service

```bash
docker compose build --no-cache <service-name>
docker compose \
  --env-file .env \
  up -d --force-recreate <service-name>
```

### Rebuild the Complete Stack

```bash
docker compose down
docker compose build --no-cache
docker compose --env-file .env up
```

### Reset the Complete Local Environment

```bash
docker compose down -v
docker compose build --no-cache
docker compose --env-file .env up
```

This removes local volumes, rebuilds all images, and starts the stack from a clean state.

## Related Documentation

| Document | Purpose |
|---|---|
| `../README.md` | Project overview |
| `../docs/how-to-launch.md` | Short first-time launch guide |
| `../docs/system-overview.md` | System architecture |
| `../genai/README.md` | GenAI providers and service development |
| `helm/README.md` | Kubernetes deployment |
| `../docs/infrastructure-automation.md` | Terraform and Ansible |
| `../CONTRIBUTING.md` | Contribution workflow |
