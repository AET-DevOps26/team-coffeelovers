
## How to Launch the Project

This project can be started with Docker Compose. The setup includes the backend authentication service and PostgreSQL database.

### Prerequisites

Before running the project, make sure you have the following installed:

- Docker

### 1. Clone the Repository

```bash

git clone https://github.com/AET-DevOps26/team-coffeelovers.git
cd team-coffeelovers
```

### 2. Start the Application

Run the following command from the root directory of the project:


```bash
docker compose up --build
```

This command builds and starts all required containers.

### 3. Service Ports

After starting the project, the services will be available on the following ports:

| Service | Port | Description |
|---|---|---|
| Client | `3000` | Frontend application |
| Auth Service | `8081` | Backend authentication service |
| PostgreSQL | `5432` | PostgreSQL database |

### 4. Test Auth Endpoints

You can test the authentication endpoints with Postman.

Postman is an API testing tool that allows you to send HTTP requests and check backend responses.

#### Register Request

```http
POST http://localhost:8081/auth/register

Example JSON Body:

{
  "username": "examplename",
  "email": "example@example.com",
  "password": "123456"
}

```

#### Login Request

```http
POST http://localhost:8081/auth/register

Example JSON Body:

{
  "email": "example@example.com",
  "password": "123456"
}

```

### 5. Check Data in Database

DBeaver is a database client that allows you to connect to PostgreSQL and view tables, users, and stored data.


### 6. Stop the Application

```bash
docker compose down
```


