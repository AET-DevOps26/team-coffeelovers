## How to Launch the Project Locally

This project can be started with Docker Compose. The setup includes the React frontend, auth service, GenAI service, and PostgreSQL database.

### Prerequisites

- Docker

### 1. Clone the Repository

```bash
git clone https://github.com/AET-DevOps26/team-coffeelovers.git
cd team-coffeelovers
```

### 2. Start the Application

From the `infra/` directory:

```bash
cd infra
docker compose up --build
```

Or from the root directory of the project:

```bash
docker compose -f infra/docker-compose.yml up --build
```

This command builds and starts all required containers.

### 3. Service URLs

| Service | URL | Description |
|---|---|---|
| Client | `http://localhost:3000` | Frontend application |
| Auth Service | `http://localhost:8081` | Authentication API |
| GenAI Service | `http://localhost:8001` | GenAI API |
| PostgreSQL | `localhost:5432` | Database |

### 4. Test Auth Endpoints

You can test the authentication endpoints with Postman or curl.

#### Register

```http
POST http://localhost:8081/auth/register
Content-Type: application/json

{
  "username": "examplename",
  "email": "example@example.com",
  "password": "123456"
}
```

#### Login

```http
POST http://localhost:8081/auth/login
Content-Type: application/json

{
  "email": "example@example.com",
  "password": "123456"
}
```

#### Health Checks

```http
GET http://localhost:8081/auth/actuator/health
GET http://localhost:8001/genai/health
```

### 5. Stop the Application

```bash
docker compose down
```

---

For Kubernetes deployment instructions, see [infra/helm/README.md](../infra/helm/README.md).
