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

The form validates password confirmation in real time. If the email or username is already registered, the backend returns HTTP 409 and the form displays "An account with this email or username already exists."

If you need to reset all users and trips, run `docker compose down -v` to wipe the database volume.

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
Start date: tomorrow
End date: day after tomorrow
Travel preference: Food & Culture
```

Submit the form. The frontend calls the Trip Service through the API Gateway, which calls the GenAI service to generate a day-by-day itinerary. The generated itinerary is cached in the database so returning to the same trip link always shows the same plan.

On the itinerary page, click **Save Plan** to persist the trip to your account. Once saved, the **Share Plan** button becomes active.

### 4.4 Share a Trip

1. On a saved itinerary, click **Share Plan**.
2. Click **Copy Link** to copy the shareable URL to clipboard.
3. Open the link in a different browser or incognito window (logged in as a different user or logged out).

When a logged-in user who does not own the trip opens the link, a banner appears at the top:
> "Shared by \<username\> — save it to your plans?"

Clicking **Save to My Plans** saves the trip to the viewer's account. It then appears in the **Shared with me** tab on the My Plans page, showing the original author's username.

Non-owners do not see the Save Plan, Share Plan, or Delete Plan buttons.

## 5. Useful Local URLs

| URL                          | Purpose                        |
| ---------------------------- | ------------------------------ |
| `http://localhost:3000`      | Frontend application           |
| `http://localhost:8080`      | API Gateway (nginx)            |
| `http://localhost:8081`      | Auth service direct port       |
| `http://localhost:8082`      | Trip service direct port       |
| `http://localhost:8001/docs` | GenAI Swagger UI               |
| `http://localhost:9090`      | Prometheus                     |
| `http://localhost:3001`      | Grafana (admin / admin)        |

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