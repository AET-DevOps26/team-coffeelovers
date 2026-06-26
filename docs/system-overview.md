# System Overview — Architecture

## 1. Initial System Structure

The AI Travel Planner will be divided into four technical components that communicate over HTTP. The frontend will send requests to the Spring Boot backend, which will orchestrate the AI generation and data persistence. A dedicated Python microservice will handle all generative AI logic.

### Server — Spring Boot REST API

The backend will be built with **Spring Boot 4.0.6 (Java 21)** and will expose a REST API consumed by the React frontend. It is planned to be structured as a set of internal services:

- **Trip Service** — will accept and store trip requests submitted by the user
- **Planning Service** — will orchestrate itinerary generation by coordinating Trip Service, Location Service, and the GenAI Service
- **Location Service** — will manage location data and handle route optimisation for generated itineraries
- **User Service** — will manage user accounts, authentication, and saved/favourite travel plans

Each service will own its own schema in a shared PostgreSQL database. Inter-service communication will be handled in-process, with the exception of the external Python GenAI microservice which will be called over HTTP.

### Client — React Frontend

The client will be a **React 19** single-page application built with React Router DOM v7. It is planned to provide:

- A trip input form (destination, number of days, travel preference)
- An itinerary view with day-by-day activity cards
- Drag-and-drop editing (reorder, remove, swap activities)
- An interactive map showing activity locations as markers
- User account pages (register, login, saved plans, favourites)

The client will communicate with the Spring Boot backend exclusively through the REST API.

### GenAI Service — Python / LangChain Microservice

The generative AI logic will run in a **Python microservice** using **LangChain**. It is planned to expose two endpoints consumed by the Planning Service:

- `POST /generate` — will receive a trip request (destination, days, preference) and return a structured day-by-day itinerary
- `POST /suggest` — will receive an existing activity and return one or more alternative activity suggestions

Internally, the service will build a prompt from the trip parameters, call an external LLM, and parse the response into a structured JSON itinerary. This separation will keep AI concerns isolated from the Spring Boot application.

### Database — PostgreSQL

**PostgreSQL** is planned as the primary data store. The schema will be divided by service ownership:

| Schema | Owned by | Stores |
|---|---|---|
| `trip` | Trip Service | Trip requests |
| `planning` | Planning Service | Generated itineraries and days |
| `location` | Location Service | Location records and route data |
| `user` | User Service | User accounts, saved plans, favourites |

---

## 2. UML Diagrams

### Analysis Object Model

The analysis object model identifies the main domain classes and their relationships, derived from the product backlog epics.

> **File:** [diagrams/analysis-object-model.md](diagrams/analysis-object-model.md)
> *(Open with [diagrams.net](https://app.diagrams.net) — use File → Import from → Device)*

**Key classes:** `User`, `TripRequest`, `TravelPreference`, `GenAIService`, `TravelPlan`, `Itinerary`, `ItineraryDay`, `Activity`, `Route`, `Location`

**Main relationships:**
- A `User` submits `TripRequest`s and saves/favourites `TravelPlan`s
- A `TripRequest` specifies a `TravelPreference` and is sent to `GenAIService`
- `GenAIService` generates a `TravelPlan`, which is composed of one `Itinerary`
- An `Itinerary` is composed of one or more `ItineraryDay`s, each scheduling one or more `Activity`s
- Each `Activity` takes place at a `Location`; each `ItineraryDay` follows an optimised `Route`

---

### Use Case Diagram

The use case diagram shows the planned interactions between actors (Visitor, User) and the system's features across all planned epics.

![Use Case Diagram](diagrams/use-case-diagram-v1.png)

**Planned use cases:**
- Generate travel plan, view itinerary, display places on map *(Visitor)*
- Edit plan (reorder, remove, swap activities) *(Visitor)*
- Create account, login *(Visitor)*
- Save plan, mark as favourite, share plan, export plan *(Registered User)*

---

### Top-Level Architecture Diagram (UML Component Diagram)

The component diagram visualises how the planned system components are structured and how they will communicate.

![Component Diagram](diagrams/component_diagram_v2.png)

**Planned components:**
- **React Frontend** — will communicate with Spring Boot via REST API (lollipop/socket interface)
- **Spring Boot Microservices** — Trip Service, Planning Service, Location Service, User Service; each connected to its own PostgreSQL schema
- **Python GenAI Service (LangChain)** — will be called by Planning Service for itinerary generation and activity suggestions
- **External LLM System** — will be called by the GenAI Service to produce AI-generated content
- **PostgreSQL** — four schemas, one per service (trip, planning, location, user)
