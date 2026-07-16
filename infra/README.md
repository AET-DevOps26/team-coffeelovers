# Local Infrastructure Setup

This directory contains the Docker Compose setup for running the AI Travel Planner locally.

It covers service startup, API Gateway routing, database checks, monitoring, logs, and troubleshooting.

For the short launch guide, see:

```txt
../docs/how-to-launch.md
```

## Included Services

The Docker Compose stack includes:

* PostgreSQL
* Auth service
* Trip service
* GenAI service
* React client
* NGINX API Gateway
* Prometheus
* Grafana

## Local URLs

| Component | URL |
| --- | --- |
| Frontend | `http://localhost:3000` |
| Grafana | `http://localhost:3001` |
| GenAI Swagger UI | `http://localhost:8001/docs` |
| API Gateway | `http://localhost:8080` |
| Auth service | `http://localhost:8081` |
| Trip service | `http://localhost:8082` |
| Prometheus | `http://localhost:9090` |
| PostgreSQL | `localhost:5432` |

A `404` or `403` on a backend root URL does not always mean the service is unavailable. Use the documented health, API, or metrics endpoints.

## API Gateway

The API Gateway exposes one local API entrypoint:

```txt
http://localhost:8080
```

| External Path | Internal Target |
| --- | --- |
| `/api/v1/auth/*` | `auth-service:8081` |
| `/api/v1/trips/*` | `trip-service:8082` |
| `/api/v1/genai/*` | `genai:8001` |
| `/genai/health` | `genai:8001` |

Auth and Trip use shorter internal paths:

```txt
auth-service: /auth/*
trip-service: /trips/*
```

NGINX rewrites the external versioned paths to these internal paths.

## Environment Setup

From the `infra` directory, copy the root environment example:

```bash
cp ../.env.example .env
```

Set the Grafana credentials in `infra/.env`:

```properties
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=replace-with-a-local-password
```

Do not commit the real `.env` file.

## Start the System

From the `infra` directory:

```bash
docker compose --env-file .env up --build
```

Run in the background:

```bash
docker compose --env-file .env up --build -d
```

From the repository root:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  up --build
```

## Stop the System

```bash
docker compose down
```

Remove containers and local volumes:

```bash
docker compose down -v
```

The `-v` option also removes PostgreSQL, Prometheus, and Grafana data.

## Check Services

List configured services:

```bash
docker compose --env-file .env config --services
```

Expected services:

```txt
postgres
auth-service
client
genai
trip-service
gateway
prometheus
grafana
```

Check running containers:

```bash
docker compose ps
```

## Check PostgreSQL

Check readiness:

```bash
docker compose exec postgres pg_isready -U coffeelovers
```

Expected result:

```txt
accepting connections
```

List tables:

```bash
docker compose exec postgres \
  psql -U coffeelovers -d coffeelovers -c "\dt"
```

## Verify APIs

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

### Trip Health

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

### Generate Itinerary

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

* HTTP `200`
* Response contains `summary`
* Response contains `itinerary`
* Response contains `activities`

### Register

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

## Monitoring

Prometheus collects metrics from the services. Grafana uses Prometheus as its default datasource.

```txt
Auth / Trip / GenAI
        ↓
    Prometheus
        ↓
      Grafana
```

### Prometheus

Open:

```txt
http://localhost:9090
```

Check targets:

```txt
http://localhost:9090/targets
```

Expected targets:

```txt
prometheus
auth-service
trip-service
genai
```

All targets should normally be `UP`.

Prometheus scrape configuration:

```txt
monitoring/prometheus/prometheus.yml
```

Metrics endpoints:

| Service | Endpoint |
| --- | --- |
| Auth | `http://localhost:8081/auth/actuator/prometheus` |
| Trip | `http://localhost:8082/actuator/prometheus` |
| GenAI | `http://localhost:8001/metrics` |

Direct checks:

```bash
curl http://localhost:8081/auth/actuator/prometheus
curl http://localhost:8082/actuator/prometheus
curl http://localhost:8001/metrics
```

### Grafana

Grafana is available at:

```txt
http://localhost:3001
```

Administrator credentials are configured in `infra/.env`:

```properties
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=replace-with-a-local-password
```

Prometheus is provisioned automatically as Grafana's default datasource.

Datasource configuration:

```txt
monitoring/grafana/provisioning/datasources/prometheus.yml
```

Datasource URL:

```txt
http://prometheus:9090
```

The datasource must use the Docker service name `prometheus`. Do not use `localhost`, because `localhost` inside the Grafana container refers to Grafana itself.

### Monitoring Dashboard

Grafana provisions the application dashboard automatically from:

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

The dashboard shows:

* service availability
* HTTP request rate
* HTTP error rate
* average HTTP request latency

### Verify Grafana

Open Grafana:

```txt
http://localhost:3001
```

Sign in using the credentials from `infra/.env`.

Open **Explore**, select the `Prometheus` datasource, and run:

```promql
up
```

Expected results:

```txt
up{job="prometheus"} 1
up{job="auth-service"} 1
up{job="trip-service"} 1
up{job="genai"} 1
```

A value of `1` means the target is available. A value of `0` means Prometheus cannot currently scrape the target.

Check the Grafana container:

```bash
docker compose ps grafana
```

Check Grafana logs:

```bash
docker compose logs grafana --tail=100
```

Restart Grafana after provisioning changes:

```bash
docker compose --env-file .env up -d --force-recreate grafana
```

### Grafana Cannot Connect to Prometheus

Check that Grafana and Prometheus are running:

```bash
docker compose ps grafana prometheus
```

Check the datasource configuration:

```txt
monitoring/grafana/provisioning/datasources/prometheus.yml
```

The datasource URL must be:

```txt
http://prometheus:9090
```

Check Grafana logs:

```bash
docker compose logs grafana --tail=100
```

Restart Grafana:

```bash
docker compose restart grafana
```

## Logs

Show service logs:

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

Follow logs continuously:

```bash
docker compose logs -f gateway
```

Replace `gateway` with another service name when needed.

## Troubleshooting

### Grafana Cannot Connect to Prometheus

Check both containers:

```bash
docker compose ps
```

The datasource must use the Docker service name:

```txt
http://prometheus:9090
```

Restart Grafana after provisioning changes:

```bash
docker compose restart grafana
```

Check logs:

```bash
docker compose logs grafana --tail=100
```

### Prometheus Target Is Down

Open:

```txt
http://localhost:9090/targets
```

Check the error for the failed target, then verify its metrics endpoint directly.

Restart Prometheus after configuration changes:

```bash
docker compose restart prometheus
```

### Auth Metrics Return `403`

Confirm that Auth Security permits:

```txt
/auth/actuator/prometheus
```

Required dependencies:

```gradle
implementation 'org.springframework.boot:spring-boot-starter-actuator'
implementation 'io.micrometer:micrometer-registry-prometheus'
```

Required configuration:

```properties
management.endpoints.web.base-path=/auth/actuator
management.endpoints.web.exposure.include=health,info,prometheus
```

Rebuild Auth after dependency changes:

```bash
docker compose build --no-cache auth-service
docker compose up -d --force-recreate auth-service
```

### Port Already in Use

Check these ports:

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

Stop the conflicting process or change the relevant Docker port mapping.

### Rebuild From Scratch

```bash
docker compose down -v
docker compose build --no-cache
docker compose --env-file .env up
```

This removes local volumes, rebuilds images, and starts the stack from a clean state.