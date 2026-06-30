# AI Travel Planner

AI Travel Planner is a DevOps-oriented web application that helps users create personalized travel itineraries with the support of Generative AI.

The project focuses on a simple core workflow: a user provides a destination, travel duration, preferences, and optionally budget information. The system then generates a structured day-by-day travel plan and exposes the functionality through a web client and REST APIs.

## Project Goal

The goal of this project is to make travel planning faster, easier, and more practical by combining:

* a React frontend,
* Spring Boot backend microservices,
* a separate Python/FastAPI GenAI service,
* PostgreSQL persistence,
* Docker-based local development,
* Kubernetes deployment,
* CI/CD automation,
* and monitoring infrastructure.

## Main Features

The current system is designed to support the following workflow:

* accept a travel destination,
* accept the number of travel days,
* accept travel preferences,
* optionally accept budget information,
* generate a personalized itinerary through the GenAI service,
* organize suggestions into a day-by-day plan,
* expose backend APIs through a local API Gateway.

## Repository Structure

```txt
.
├── api/                  # OpenAPI / API specifications and API helper scripts
├── backend/              # Spring Boot backend services and shared backend modules
│   ├── auth-service/     # Authentication and user access service
│   ├── trip-service/     # Trip and itinerary domain service
│   └── common/           # Shared backend response/error utilities
├── client/               # React frontend application
├── docs/                 # Product, architecture, launch, and project documentation
├── genai/                # Python/FastAPI GenAI microservice
├── infra/                # Docker Compose, gateway, Kubernetes, Terraform, Ansible
│   ├── nginx/            # Local NGINX API Gateway configuration
│   ├── helm/             # Kubernetes Helm deployment
│   ├── terraform/        # Azure infrastructure automation
│   └── ansible/          # Azure VM provisioning/deployment automation
└── .github/workflows/    # GitHub Actions CI/CD workflows
```

## Services

| Service             | Technology                  | Purpose                                                                 |
| ------------------- | --------------------------- | ----------------------------------------------------------------------- |
| Client              | React                       | User-facing frontend application                                        |
| Auth Service        | Spring Boot                 | User registration, login, and authentication-related API logic          |
| Trip Service        | Spring Boot                 | Trip planning domain logic and trip persistence                         |
| Common Module       | Java / Spring shared module | Shared response, error, and exception utilities for backend services    |
| GenAI Service       | Python / FastAPI            | Independent GenAI microservice for itinerary generation and suggestions |
| PostgreSQL          | PostgreSQL                  | Local persistent storage for backend services                           |
| NGINX Gateway       | NGINX                       | Single local API entrypoint and route forwarding                        |
| Helm Deployment     | Helm / Kubernetes           | Deployment to the AET Kubernetes cluster                                |
| Terraform / Ansible | IaC / automation            | Azure infrastructure and VM deployment support                          |

## Local Development

The recommended way to run the project locally is Docker Compose from the `infra/` directory.

The local setup starts the main application services and exposes the API through an NGINX Gateway.

### Prerequisites

Install:

* Docker
* Docker Compose plugin

Optional tools for development and debugging:

* Java 21
* Python 3.12
* Node.js
* curl or Postman
* kubectl and Helm for Kubernetes deployment work

## How to Launch Locally

From the repository root:

```bash
cd infra
docker compose up --build
```

Or without changing directories:

```bash
docker compose -f infra/docker-compose.yml up --build
```

This builds and starts the local application stack.

## Local URLs

| Component                 | URL                          | Notes                                        |
| ------------------------- | ---------------------------- | -------------------------------------------- |
| Frontend client           | `http://localhost:3000`      | React application                            |
| API Gateway               | `http://localhost:8080`      | Recommended local API entrypoint             |
| Auth service direct port  | `http://localhost:8081`      | Internal service exposed for local debugging |
| Trip service direct port  | `http://localhost:8082`      | Internal service exposed for local debugging |
| GenAI service direct port | `http://localhost:8001`      | FastAPI service                              |
| GenAI Swagger UI          | `http://localhost:8001/docs` | FastAPI API documentation                    |
| PostgreSQL                | `localhost:5432`             | Local database                               |

Use the API Gateway for normal local testing.

## API Gateway Routes

The local Docker Compose setup includes an NGINX API Gateway as the single entrypoint for local API requests.

Gateway base URL:

```txt
http://localhost:8080
```

The gateway routes external paths to internal services:

| External Route    | Internal Service    |
| ----------------- | ------------------- |
| `/api/v1/auth/*`  | `auth-service:8081` |
| `/api/v1/trips/*` | `trip-service:8082` |
| `/api/v1/genai/*` | `genai:8001`        |
| `/genai/health`   | `genai:8001`        |

The gateway keeps public local API paths versioned and consistent while allowing individual services to keep their current internal paths.

## Quick Verification

After starting the system, verify the main services.

### List running services

```bash
cd infra
docker compose ps
```

### GenAI health through gateway

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

### Trip service health through gateway

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

### PostgreSQL readiness

```bash
docker compose exec postgres pg_isready -U coffeelovers
```

Expected result:

```txt
accepting connections
```

## Test GenAI Generate Endpoint

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

## Stop the Local System

From the `infra/` directory:

```bash
docker compose down
```

To stop the system and remove local database volumes:

```bash
docker compose down -v
```

Use `down -v` when you want to reset local test data.

## Documentation

* [Problem Statement](docs/problem-statement.md)
* [How to Launch](docs/how-to-launch.md)
* [System Overview](docs/system-overview.md)
* [Product Backlog](docs/product-backlog.md)
* [Infrastructure README](infra/README.md)
* [GenAI Service README](genai/README.md)
* [Kubernetes Deployment](infra/helm/README.md)
* [Infrastructure Automation](docs/infrastructure-automation.md)
* [Contributing Guide](CONTRIBUTING.md)

## Development Workflow

This project follows a Git Flow-style workflow:

```txt
main
  ↑
develop
  ↑
feature/*, bugfix/*, hotfix/*
```

Rules:

* Create a branch for every task.
* Branch from the latest `develop`.
* Open pull requests into `develop`.
* Test changes before merging.
* Update documentation when setup, APIs, dependencies, environment variables, or structure change.
* Do not commit secrets, API keys, tokens, or private credentials.

## Responsibilities

* **Paulina**: Frontend development — UI, React components, and client-side tests.
* **Adnan**: Backend services — Spring Boot microservices, APIs, and server-side logic.
* **Berfin**: Generative AI integration and prompts — GenAI features, prompt design, and quality checks.