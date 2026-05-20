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

## Repository Structure

- `/api` : OpenAPI / API specifications.
- `/backend` : Backend microservices
- `/client` : Frontend application.
- `/infra` : Docker, infrastructure and deployment files.
- `.github/workflows` : CI pipeline definitions.

## Documentation

- [Problem Statement](docs/problem-statement.md)
- [Launch the System](docs/how-to-launch.md)

## Responsibilities

- **Paulina**: Frontend development — UI, React components, and client-side tests.
- **Adnan**: Backend services — Spring Boot microservices, APIs, and server-side logic.
- **Berfin**: Generative AI integration and prompts — responsibility for GenAI features, prompt design, and dataset/quality checks. CI/CD pipeline — GitHub Actions workflows, build and deployment automation.

