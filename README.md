# AI Travel Planner

AI Travel Planner is a web application concept that helps users create personalized travel itineraries with the support of Generative AI.

The project focuses on a simple workflow: the user provides a destination, number of travel days, and travel preferences, and the system generates a structured day-by-day travel plan.

## Project Goal

The goal of this project is to make travel planning faster, easier, and more practical by combining AI-generated suggestions with location-aware planning.

## What the App Will Do

- Accept a travel destination
- Accept the number of travel days
- Accept a travel style or preference
- Generate a personalized itinerary with GenAI
- Organize suggestions into a day-by-day plan
- Use map and location information to improve route quality

## Documentation

- [Problem Statement](docs/problem-statement.md)
- [Launch the System](docs/how-to-launch.md)
- [Infrastructure Automation](docs/infrastructure-automation.md)

## Repository Structure

- `/api` : OpenAPI / API specifications.
- `/backend` : Backend microservices
- `/client` : Frontend application.
- `/infra` : Docker, infrastructure and deployment files.
- `.github/workflows` : CI pipeline definitions.

## Local Development with API Gateway

The local Docker Compose setup includes an NGINX API Gateway as the single entrypoint for local API requests.

The gateway is available at:

```txt
http://localhost:8080
```

It routes requests to the internal services:

| External Route    | Internal Service |
| ----------------- | ---------------- |
| `/api/v1/auth/*`  | `auth-service`   |
| `/api/v1/trips/*` | `trip-service`   |
| `/api/v1/genai/*` | `genai`          |
| `/genai/health`   | `genai`          |

The gateway keeps the public local API paths consistent while allowing services to keep their internal routes.

### Start the Local System

From the `infra` directory:

```bash
docker compose up --build
```

### Quick Verification

```bash
curl http://localhost:8080/genai/health
curl http://localhost:8080/api/v1/trips/health
```

For a full local infrastructure test guide, see:

```txt
infra/README.md
```


## Responsibilities

- **Paulina**: Frontend development — UI, React components, and client-side tests.
- **Adnan**: Backend services — Spring Boot microservices, APIs, and server-side logic.
- **Berfin**: Generative AI integration and prompts — responsibility for GenAI features, prompt design, and quality checks.
