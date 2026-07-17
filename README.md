# AI Travel Planner

AI Travel Planner is a web application that generates personalized travel itineraries with the support of Generative AI.

Users select a destination, start date, end date, and travel experience. The application creates a structured day-by-day itinerary that can be viewed, saved, and shared through a link.

The project also demonstrates a complete DevOps workflow with microservices, containerized development, CI/CD, infrastructure automation, deployment, and monitoring.

## Main Features

The current application supports:

- destination input
- start and end date selection
- travel experience selection
- AI-generated day-by-day itineraries
- user registration and login
- saving trips
- sharing trips through a generated link
- mock and external LLM providers
- local execution with Docker Compose
- API routing through NGINX
- Prometheus monitoring
- Grafana dashboards
- Kubernetes deployment with Helm
- Azure automation with Terraform and Ansible
- GitHub Actions CI/CD

The GenAI API supports optional budget information, but budget is not yet integrated into the complete frontend and backend workflow.

## Architecture

The application consists of:

- React Client
- NGINX API Gateway
- Auth Service
- Trip Service
- Common backend module
- GenAI Service
- PostgreSQL
- Prometheus
- Grafana

```txt
Browser
   |
   v
React Client
   |
   v
NGINX API Gateway
   |
   +----------------+----------------+----------------+
   |                |                |
   v                v                v
Auth Service    Trip Service    GenAI Service
   |                |                |
   +--------+-------+                |
            |                        v
            v                 External LLM Provider
       PostgreSQL
```

For the detailed architecture, see [System Overview](docs/system-overview.md).

## Repository Structure

```txt
.
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── api/                    # API contracts
├── backend/
│   ├── auth-service/       # Authentication service
│   ├── trip-service/       # Trip service
│   └── common/             # Shared backend module
├── client/                 # React frontend
├── docs/                   # Project documentation
├── genai/                  # FastAPI GenAI service
└── infra/
    ├── ansible/            # VM configuration
    ├── helm/               # Kubernetes deployment
    ├── monitoring/         # Prometheus and Grafana
    ├── nginx/              # API Gateway
    ├── terraform/          # Azure infrastructure
    └── docker-compose.yml  # Local stack
```

## Run Locally

### Prerequisites

Install:

- Git
- Docker
- Docker Compose plugin

### Clone the Repository

```bash
git clone https://github.com/AET-DevOps26/team-coffeelovers.git
cd team-coffeelovers
```

### Configure the Environment

Create:

```txt
infra/.env
```

Configure the required local values.

For local GenAI development, the mock provider can be used:

```properties
GENAI_PROVIDER=mock
```

Do not commit environment files, API keys, passwords, tokens, or other secrets.

### Start the Application

```bash
docker compose \
  --env-file infra/.env \
  -f infra/docker-compose.yml \
  up --build
```

For the complete first-time setup, see [How to Launch](docs/how-to-launch.md).

For Docker Compose services, monitoring, logs, and troubleshooting, see [Infrastructure Setup](infra/README.md).

## Local URLs

| Component | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Grafana | `http://localhost:3001` |
| GenAI Swagger UI | `http://localhost:8001/docs` |
| API Gateway | `http://localhost:8080` |
| Auth Service | `http://localhost:8081` |
| Trip Service | `http://localhost:8082` |
| Prometheus | `http://localhost:9090` |

Use the API Gateway for normal application requests.

## Main User Workflow

1. Open the frontend.
2. Register or log in.
3. Enter a destination.
4. Select start and end dates.
5. Select a travel experience.
6. Generate an itinerary.
7. Save the trip.
8. Share the trip through its generated link.

The frontend currently does not collect budget information.

## Deployment and Monitoring

The project supports:

- Docker Compose for local development
- GitHub Actions for CI/CD
- Helm for Kubernetes deployment
- Terraform and Ansible for Azure automation
- Prometheus for metrics collection
- Grafana for metrics visualization

Detailed instructions are maintained in the related documentation.

## Documentation

| Document | Purpose |
|---|---|
| [Problem Statement](docs/problem-statement.md) | Product problem, scope, and users |
| [System Overview](docs/system-overview.md) | Architecture and service communication |
| [Product Backlog](docs/product-backlog.md) | Implemented and planned functionality |
| [How to Launch](docs/how-to-launch.md) | Local launch guide |
| [Infrastructure Setup](infra/README.md) | Docker Compose, monitoring, logs, and troubleshooting |
| [GenAI Service](genai/README.md) | GenAI providers, endpoints, and configuration |
| [Kubernetes Deployment](infra/helm/README.md) | Helm deployment |
| [Infrastructure Automation](docs/infrastructure-automation.md) | Terraform and Ansible |
| [Contributing Guide](CONTRIBUTING.md) | Development workflow and contribution rules |

## Development Workflow

```txt
main
  ↑
develop
  ↑
feature/*, bugfix/*, docs/*, hotfix/*
```

General rules:

- create a branch for every issue
- branch from the latest `develop`
- open pull requests into `develop`
- run relevant tests before merging
- update documentation when behavior changes
- do not commit secrets

See [Contributing Guide](CONTRIBUTING.md) for the complete workflow.

## Team Responsibilities

- **Paulina:** Frontend development and client-side tests
- **Adnan:** Spring Boot backend services and APIs
- **Berfin:** GenAI integration, providers, prompts, and quality checks