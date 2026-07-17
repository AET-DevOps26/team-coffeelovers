# How to Launch the Project Locally

This guide explains how to start the AI Travel Planner locally and verify the main user workflow through the frontend.

For detailed infrastructure configuration, API Gateway routing, monitoring, service logs, database checks, and troubleshooting, see:

```txt
infra/README.md
```

## Prerequisites

Install:

- Git
- Docker
- Docker Compose plugin

Recommended terminals:

- Git Bash
- WSL
- Linux terminal
- macOS terminal

The commands in this guide use Bash syntax.

## 1. Clone the Repository

```bash
git clone https://github.com/AET-DevOps26/team-coffeelovers.git
cd team-coffeelovers
```

## 2. Configure the Environment

Create the Docker Compose environment file:

```txt
infra/.env
```

For local development, configure the GenAI service to use the deterministic mock provider:

```properties
GENAI_PROVIDER=mock
GENAI_LOG_LEVEL=INFO
```

Configure the required application, database, authentication, and Grafana values described in:

```txt
infra/README.md
```

Do not commit:

- `infra/.env`
- API keys
- passwords
- JWT secrets
- access tokens
- private credentials

## 3. Validate the Configuration

From the repository root:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  config
```

The command should finish without configuration errors.

## 4. Start the Application

From the repository root:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  up --build
```

To run the application in the background:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  up --build -d
```

The local stack includes:

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

Check the container status:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  ps
```

Wait until the required application services are running before opening the frontend.

## 5. Open the Frontend

Open:

```txt
http://localhost:3000
```

The frontend is the main entrypoint for testing the application workflow.

## 6. Test the Main User Workflow

### 6.1 Register

1. Open the registration page.
2. Create a local test user.

Example:

```txt
Email: testuser@example.com
Password: Password123!
```

Use a different email address when the user already exists.

To remove all local users and database data, follow the reset instructions in [Reset Local Data](#10-reset-local-data).

### 6.2 Log In

1. Open the login page.
2. Enter the credentials created during registration.
3. Submit the login form.

After successful authentication, the trip planning workflow should become available.

### 6.3 Generate an Itinerary

Enter trip information in the frontend.

Example:

```txt
Destination: Maastricht
Start Date: ---
End Date: ---
Preferences: Mixed Trip
```

Submit the form.

The system should:

1. send the request through the NGINX API Gateway
2. generate a structured itinerary through the GenAI Service
3. display the day-by-day itinerary in the frontend

The frontend currently does not collect budget information. Optional budget support exists only at the GenAI API level and is not part of the complete user workflow.

### 6.4 Save the Trip

Save the generated itinerary while authenticated.

The Trip Service should persist the trip data in PostgreSQL.

### 6.5 Share the Trip

Use the sharing option for the generated trip.

The application should generate a link that can be used to view the shared trip.

## 7. Verify the Services

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

A `404` or `403` response from a service root URL does not necessarily indicate a failure. Use the documented health and API endpoints for verification.

## 8. Verify Monitoring

### Prometheus

Open:

```txt
http://localhost:9090/targets
```

The following targets should report `UP`:

```txt
prometheus
auth-service
trip-service
genai
```

### Grafana

Open:

```txt
http://localhost:3001
```

Sign in with the Grafana credentials configured in `infra/.env`.

Open:

```txt
Dashboards
→ AI Travel Planner
→ AI Travel Planner Monitoring
```

The dashboard should display metrics for the Auth, Trip, and GenAI services.

## 9. Local URLs

| Component | URL | Purpose |
|---|---|---|
| Frontend | `http://localhost:3000` | Main user interface |
| Grafana | `http://localhost:3001` | Monitoring dashboards |
| GenAI Swagger UI | `http://localhost:8001/docs` | GenAI API documentation |
| API Gateway | `http://localhost:8080` | Main local API entrypoint |
| Auth Service | `http://localhost:8081` | Direct development access |
| Trip Service | `http://localhost:8082` | Direct development access |
| Prometheus | `http://localhost:9090` | Metrics and target status |
| PostgreSQL | `localhost:5432` | Local database |

Use the API Gateway for normal application requests. Direct service ports are primarily intended for development and debugging.

## 10. Reset Local Data

Stop the application while preserving local volumes:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  down
```

Stop the application and remove local volumes:

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  down -v
```

The `-v` option removes local persistent data, including:

- PostgreSQL data
- registered test users
- saved trips
- Prometheus data
- Grafana data

Use this command only when a complete local reset is intended.

## Related Documentation

| Document | Purpose |
|---|---|
| `README.md` | Project overview |
| `docs/system-overview.md` | Current architecture |
| `infra/README.md` | Detailed infrastructure, monitoring, logs, and troubleshooting |
| `genai/README.md` | GenAI providers, endpoints, and development |
| `infra/helm/README.md` | Kubernetes deployment |
| `CONTRIBUTING.md` | Development and contribution workflow |