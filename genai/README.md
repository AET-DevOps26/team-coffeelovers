# GenAI Service

Initial Python/FastAPI microservice for the AI Travel Planner project.

This service is currently a minimal foundation for future GenAI features. It provides a basic FastAPI application, a health check endpoint, Dockerfile support, and initial dependency setup.

## Structure

```txt
genai/
├── src/
│   └── main.py
├── tests/
├── docs/
├── requirements.txt
├── .env.example
├── .gitignore
├── .dockerignore
└── Dockerfile
```

## Requirements

* Python 3.12
* pip
* Docker, optional for containerized run

## Local Setup

Create and activate a virtual environment from the project root:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r genai\requirements.txt
```

Run the service locally:

```powershell
cd genai\src
python main.py
```

The service runs on:

```txt
http://127.0.0.1:8001
```

## Available Endpoints

| Method | Endpoint  | Description                         |
| ------ | --------- | ----------------------------------- |
| GET    | `/`       | Returns basic service information   |
| GET    | `/health` | Returns service health status       |
| GET    | `/docs`   | Opens FastAPI Swagger documentation |

## Docker Usage

Build the Docker image:

```powershell
cd genai
docker build -t genai-service .
```

Run the container:

```powershell
docker run --rm -p 8001:8001 genai-service
```

Then open:

```txt
http://127.0.0.1:8001
http://127.0.0.1:8001/health
```

## Environment Variables

Copy the example environment file if local configuration is needed:

```powershell
cd genai
Copy-Item .env.example .env
```

Current placeholders:

```env
OPENAI_API_KEY=
LLM_MODEL=gpt-3.5-turbo
LOG_LEVEL=INFO
```

The current minimal service does not require these variables yet. They are included as placeholders for future LLM integration.

## Docker Compose

The GenAI service can be added to `docker-compose.yml` as an independent service:

```yaml
genai:
  build:
    context: ../genai
    dockerfile: Dockerfile
  ports:
    - "8001:8001"
  environment:
    - OPENAI_API_KEY=${OPENAI_API_KEY:-}
    - LLM_MODEL=${LLM_MODEL:-gpt-3.5-turbo}
    - LOG_LEVEL=${LOG_LEVEL:-INFO}
  restart: unless-stopped
```

The service does not currently require `depends_on` because it does not depend on PostgreSQL or any backend service yet.

Inside the Docker Compose network, other services can reach the GenAI service with:

```txt
http://genai:8001
```

From the local browser, the service is available at:

```txt
http://localhost:8001
```

## Verification Commands

Install dependencies:

pip install -r genai\requirements.txt

Run locally:

cd genai\src
python main.py

Build Docker image:

cd genai
docker build -t genai-service .

Run Docker container:

docker run --rm -p 8001:8001 genai-service

Test endpoints:

http://127.0.0.1:8001/
http://127.0.0.1:8001/health
http://127.0.0.1:8001/docs