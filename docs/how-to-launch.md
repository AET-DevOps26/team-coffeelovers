# How to Launch the Project Locally

This guide explains how to start the AI Travel Planner locally and test the main user workflow through the frontend.

For detailed infrastructure, gateway routing, database checks, service logs, and troubleshooting, see:

```txt
infra/README.md
```

## Prerequisites

Install:

* Docker
* Docker Compose plugin

Recommended terminal for command examples:

* Git Bash
* WSL
* Linux terminal
* macOS terminal

The `curl` examples in this project use Unix-style command syntax. On Windows, Git Bash or WSL is recommended.

## 1. Clone the Repository

```bash
git clone https://github.com/AET-DevOps26/team-coffeelovers.git
cd team-coffeelovers
```

## 2. Start the Application

From the repository root:

```bash
cd infra
docker compose up --build
```

Or from the repository root without changing directories:

```bash
docker compose -f infra/docker-compose.yml up --build
```

This builds and starts the local application stack.

## 3. Open the Frontend

Open the frontend in your browser:

```txt
http://localhost:3000
```

This is the main user-facing application.

## 4. Test the Main User Workflow

Use the frontend to test the application end to end.

### 4.1 Register a User

1. Open the frontend:

```txt
http://localhost:3000
```

2. Go to the registration page.
3. Create a local test user.

Example test data:

```txt
Username: testuser
Email: testuser@example.com
Password: Password123!
```

If the email already exists, use a different email address or reset the local database volume.

### 4.2 Login

1. Go to the login page.
2. Login with the user created in the previous step.

Example:

```txt
Email: testuser@example.com
Password: Password123!
```

After login, the frontend should allow access to the trip planning workflow.

### 4.3 Create and Save a Trip

Use the trip planning page in the frontend.

Example trip input:

```txt
Destination: Maastricht
Days: 2
Preferences: old town, food
Budget: 250 EUR
```

Submit the form to generate and save the trip.

The frontend should send requests to the backend through the local API Gateway. The backend services then coordinate with the GenAI service and persist trip-related data.

## 5. Useful Local URLs

| URL                          | Purpose                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| `http://localhost:3000`      | Frontend application                                              |
| `http://localhost:8001/docs` | GenAI Swagger UI                                                  |
| `http://localhost:8080`      | API Gateway root                                |
| `http://localhost:8081`      | Auth service direct port               |
| `http://localhost:8082`      | Trip service direct port

A `404` or `403` on a backend root URL does not necessarily mean the service is broken. Use the frontend or the documented API endpoints for verification.

## 6. Quick API Checks

These checks are optional if the frontend workflow works, but they are useful for debugging.

### GenAI Health

```bash
curl http://localhost:8080/genai/health
```

### Trip Service Health

```bash
curl http://localhost:8080/api/v1/trips/health
```

## 7. Stop the Application

From the `infra/` directory:

```bash
docker compose down
```

To stop the system and remove local database data:

```bash
docker compose down -v
```

Use `docker compose down -v` when you want to reset local test users, saved trips, and database state.

## More Details

For detailed local infrastructure checks, see:

```txt
infra/README.md
```

For Kubernetes deployment instructions, see:

```txt
infra/helm/README.md
```