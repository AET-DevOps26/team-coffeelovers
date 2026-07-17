# Product Backlog: AI Travel Planner

## 1. Purpose

This backlog describes the implemented, partially implemented, and planned capabilities of the AI Travel Planner.

It is organized by product and platform epics. Each user story includes its current status, acceptance criteria, and remaining work where applicable.

This is a living document and must be updated when:

- a feature is implemented
- product scope changes
- acceptance criteria change
- a planned feature is removed
- implementation reveals additional work

## 2. Status Legend

| Status | Meaning |
|---|---|
| `Implemented` | Available in the current end-to-end application |
| `Partially Implemented` | Available only in part of the system or missing full integration |
| `Planned` | Approved future work that has not yet been implemented |
| `Optional` | Possible enhancement outside the current required scope |

## 3. Current Product Scope

The current application supports:

- destination input
- start and end date selection
- travel experience selection
- AI-generated day-by-day itineraries
- user registration
- user login
- saving trips
- sharing trips through a generated link
- mock and external LLM generation providers
- local execution through Docker Compose
- API routing through NGINX
- monitoring through Prometheus and Grafana

The GenAI API accepts optional budget information, but budget is not yet integrated into the complete frontend and backend workflow.

## 4. Epic Overview

| Epic | Name | Overall Status |
|---|---|---|
| Epic 1 | Trip Input and Itinerary Generation | Implemented |
| Epic 2 | Accounts and Trip Management | Implemented |
| Epic 3 | GenAI Capabilities | Partially Implemented |
| Epic 4 | Itinerary Experience Improvements | Planned |
| Epic 5 | Platform, Delivery, and Observability | Implemented / Ongoing |
| Epic 6 | Documentation and Project Quality | Ongoing |

---

# Epic 1: Trip Input and Itinerary Generation

## Goal

Allow users to provide basic travel information and generate a personalized itinerary.

## User Story 1.1: Enter a Destination

**Status:** `Implemented`

As a visitor, I want to enter a destination so that the application knows where I want to travel.

### Acceptance Criteria

- The user can enter a destination.
- The destination field is required.
- Empty input is rejected.
- The destination is included in the itinerary generation request.

### Tasks

- [x] Create destination input field
- [x] Add required-field validation
- [x] Include destination in the request model
- [x] Display validation feedback

---

## User Story 1.2: Select Travel Dates

**Status:** `Implemented`

As a visitor, I want to select start and end dates so that the application can determine the duration of my trip.

### Acceptance Criteria

- The user can select a start date.
- The user can select an end date.
- Both fields are required.
- The end date cannot be earlier than the start date.
- The trip duration is derived from the selected dates.
- The resulting duration is included in the generation request.

### Tasks

- [x] Create start date input
- [x] Create end date input
- [x] Validate the date range
- [x] Calculate trip duration
- [x] Include trip duration in the request

---

## User Story 1.3: Select a Travel Experience

**Status:** `Implemented`

As a visitor, I want to select a travel experience so that the generated plan matches my interests.

### Current Options

- Popular Attractions
- Historical
- Outdoor Activities
- Food & Culture
- Mixed Trip

### Acceptance Criteria

- The available experience options are displayed.
- The user can select one option.
- The selected option is visually identifiable.
- The selected experience is included in the generation request.
- A default selection may be used when required.

### Tasks

- [x] Create travel experience cards
- [x] Add selection state
- [x] Add predefined experience options
- [x] Include the selected experience in the request

---

## User Story 1.4: Generate a Travel Itinerary

**Status:** `Implemented`

As a visitor, I want to generate an itinerary from my trip details so that I can quickly receive a travel plan.

### Acceptance Criteria

- The request includes the destination, trip duration, and selected travel experience.
- The GenAI Service returns a structured response.
- The itinerary is grouped by day.
- Activities include a title and description.
- Generation errors are shown to the user.
- The generated itinerary is displayed in the frontend.

### Tasks

- [x] Define the generation API contract
- [x] Implement the GenAI generation endpoint
- [x] Connect the frontend to the generation flow
- [x] Validate generation requests
- [x] Validate structured GenAI responses
- [x] Display the itinerary in the frontend
- [x] Add error handling

---

## User Story 1.5: View a Generated Itinerary

**Status:** `Implemented`

As a visitor, I want to view the generated itinerary day by day so that I can understand the proposed travel plan.

### Acceptance Criteria

- The itinerary is displayed after successful generation.
- The result is grouped by day.
- Activities are presented in a readable structure.
- Each activity includes available descriptive information.
- Empty or invalid responses do not break the page.

### Tasks

- [x] Create itinerary result view
- [x] Create day-level presentation
- [x] Create activity presentation
- [x] Handle empty and invalid response states

---

# Epic 2: Accounts and Trip Management

## Goal

Allow users to create accounts, authenticate, save generated trips, and share trips with others.

## User Story 2.1: Create an Account

**Status:** `Implemented`

As a visitor, I want to create an account so that I can save and manage my trips.

### Acceptance Criteria

- The visitor can open the registration page.
- Required fields are validated.
- Passwords are stored securely.
- Duplicate account data is rejected.
- Successful registration provides feedback.
- The account can be used for login.

### Tasks

- [x] Create registration page
- [x] Add registration validation
- [x] Implement registration endpoint
- [x] Encode passwords
- [x] Persist user data
- [x] Handle duplicate users
- [x] Display success and error feedback

---

## User Story 2.2: Log In

**Status:** `Implemented`

As a registered user, I want to log in so that I can access user-specific functionality.

### Acceptance Criteria

- The user can log in with valid credentials.
- Invalid credentials produce an error.
- Disabled or invalid users cannot authenticate.
- Successful login returns authentication information.
- The frontend stores and uses the authentication state.
- The user can log out.

### Tasks

- [x] Create login page
- [x] Implement login endpoint
- [x] Validate credentials
- [x] Generate authentication token
- [x] Manage frontend authentication state
- [x] Add logout behavior
- [x] Display authentication errors

---

## User Story 2.3: Save a Trip

**Status:** `Implemented`

As an authenticated user, I want to save a generated trip so that I can access it later.

### Acceptance Criteria

- Only authenticated users can save trips.
- Generated trip information is persisted.
- Saved trips are associated with the correct user.
- The user receives success or error feedback.
- Saved trip data can be retrieved.

### Tasks

- [x] Define trip persistence model
- [x] Implement trip repository
- [x] Implement trip service logic
- [x] Implement trip API endpoints
- [x] Connect the frontend save action
- [x] Associate trips with users
- [x] Add validation and error handling

---

## User Story 2.4: Share a Trip Through a Link

**Status:** `Implemented`

As a user, I want to share a trip through a link so that another person can view it.

### Acceptance Criteria

- The user can select the sharing action.
- The system creates or exposes a shareable link.
- The link can be copied.
- A person with the link can open the shared trip.
- The user receives feedback after sharing.

### Tasks

- [x] Add sharing action
- [x] Generate or expose the shareable link
- [x] Add link-copy behavior
- [x] Create shared trip view
- [x] Handle invalid or unavailable shared trips

---

# Epic 3: GenAI Capabilities

## Goal

Provide reliable and interchangeable itinerary generation capabilities.

## User Story 3.1: Use a Deterministic Mock Provider

**Status:** `Implemented`

As a developer, I want a deterministic mock provider so that itinerary generation can be tested without calling an external LLM.

### Acceptance Criteria

- The mock provider does not require an external API key.
- The same input produces predictable output.
- The response follows the API contract.
- The provider can be used in local development and CI.
- Unit tests do not depend on external LLM services.

### Tasks

- [x] Define provider abstraction
- [x] Implement mock provider
- [x] Add provider configuration
- [x] Add deterministic test responses
- [x] Use the mock provider in tests and CI

---

## User Story 3.2: Generate Itineraries with an External LLM

**Status:** `Implemented`

As a user, I want the application to use an external LLM so that I can receive dynamically generated itineraries.

### Acceptance Criteria

- The provider can be selected through configuration.
- The external API key is read from environment variables.
- Secrets are not committed to the repository.
- The LLM response is parsed into the expected structure.
- Invalid provider responses are handled.
- Provider failures return clear application errors.

### Tasks

- [x] Implement OpenAI-compatible provider
- [x] Add provider factory
- [x] Add environment configuration
- [x] Build itinerary prompt
- [x] Parse structured output
- [x] Add provider error handling
- [x] Document provider configuration

---

## User Story 3.3: Validate Structured AI Responses

**Status:** `Implemented`

As a developer, I want generated responses to be validated so that invalid LLM output does not break the application.

### Acceptance Criteria

- Generated output is validated against structured models.
- Missing required fields are rejected.
- Invalid output produces a controlled error.
- API responses remain aligned with the OpenAPI contract.

### Tasks

- [x] Define request and response models
- [x] Add structured response validation
- [x] Add invalid-output handling
- [x] Add tests for valid and invalid responses
- [x] Maintain OpenAPI alignment

---

## User Story 3.4: Support Budget-Aware Generation

**Status:** `Partially Implemented`

As a user, I want to provide a travel budget so that recommendations can better match my financial preferences.

### Current State

The GenAI request model accepts optional budget information.

The frontend does not currently collect budget information, and the complete backend flow does not yet forward it end to end.

### Acceptance Criteria

- The frontend allows the user to enter a budget.
- The user can specify an amount and currency.
- Budget data is validated.
- The backend forwards budget information to the GenAI Service.
- The generated itinerary considers the provided budget.
- Budget details are represented in the response where appropriate.
- End-to-end tests cover budget-aware generation.

### Completed Tasks

- [x] Add optional budget model to the GenAI API
- [x] Validate budget data at the GenAI service level

### Remaining Tasks

- [ ] Add budget input to the frontend
- [ ] Add amount and currency validation
- [ ] Forward budget through the backend flow
- [ ] Include budget in user-facing request handling
- [ ] Display budget-related information
- [ ] Add end-to-end tests

---

## User Story 3.5: Suggest Alternative Activities

**Status:** `Partially Implemented`

As a user, I want alternative activity suggestions so that I can replace an activity that does not match my interests.

### Current State

The GenAI Service exposes a suggestion capability. Complete frontend and backend integration must be verified before this feature is considered available to users.

### Acceptance Criteria

- The user can request alternatives for an activity.
- The request includes sufficient activity and trip context.
- The GenAI Service returns structured suggestions.
- The alternatives match the destination and travel preference.
- The user can select a replacement.
- The selected activity is updated in the itinerary.
- Saved trip data is updated when applicable.

### Tasks

- [x] Define the GenAI suggestion endpoint
- [x] Add suggestion request and response models
- [ ] Verify backend integration
- [ ] Add frontend suggestion action
- [ ] Display alternative activities
- [ ] Replace the selected activity
- [ ] Update persisted itinerary data
- [ ] Add end-to-end tests

---

# Epic 4: Itinerary Experience Improvements

## Goal

Improve how users inspect, customize, and use generated itineraries.

## User Story 4.1: View Activity Details

**Status:** `Planned`

As a visitor, I want to open an activity and view more information so that I can evaluate the recommendation.

### Acceptance Criteria

- An activity can be selected.
- A detail view or modal opens.
- Available descriptive information is displayed.
- Missing optional information is handled gracefully.
- The detail view can be closed.

### Tasks

- [ ] Define activity detail fields
- [ ] Create activity detail component
- [ ] Add activity selection behavior
- [ ] Add close behavior
- [ ] Handle unavailable metadata

---

## User Story 4.2: Display Activities on a Map

**Status:** `Planned`

As a visitor, I want to see itinerary activities on a map so that I can understand their locations.

### Acceptance Criteria

- A supported map provider is selected.
- Activities with valid coordinates appear as markers.
- Markers correspond to itinerary activities.
- Selecting a marker displays basic information.
- Missing location data does not break the map.

### Tasks

- [ ] Select map provider
- [ ] Define location data requirements
- [ ] Add coordinates to activity data
- [ ] Create map component
- [ ] Display markers
- [ ] Connect markers with itinerary activities

---

## User Story 4.3: Optimize Activity Order

**Status:** `Planned`

As a visitor, I want nearby activities grouped logically so that the trip requires less unnecessary travel.

### Acceptance Criteria

- The system has reliable location information.
- Nearby activities can be grouped together.
- Travel time or distance is considered.
- The generated order avoids unnecessary backtracking where possible.
- The application does not claim real-time optimization without verified route data.

### Tasks

- [ ] Select a location or routing provider
- [ ] Add reliable coordinates
- [ ] Define route optimization strategy
- [ ] Add distance or travel-time calculation
- [ ] Integrate optimized ordering
- [ ] Add validation and tests

---

## User Story 4.4: Reorder Activities

**Status:** `Planned`

As a user, I want to reorder activities so that I can customize my itinerary.

### Acceptance Criteria

- Activities can be reordered within a day.
- Moving activities between days is supported if included in scope.
- The updated order is displayed immediately.
- Saved trips preserve the updated order.
- Related views remain consistent.

### Tasks

- [ ] Select drag-and-drop library
- [ ] Implement activity reordering
- [ ] Update frontend state
- [ ] Persist the updated order
- [ ] Add interaction tests

---

## User Story 4.5: Remove an Activity

**Status:** `Planned`

As a user, I want to remove an activity so that unwanted recommendations are excluded.

### Acceptance Criteria

- The user can remove an activity.
- The itinerary updates immediately.
- Saved data is updated.
- The user receives confirmation or can undo the action.

### Tasks

- [ ] Add remove action
- [ ] Update itinerary state
- [ ] Persist removal
- [ ] Add confirmation or undo behavior
- [ ] Add tests

---

## User Story 4.6: Mark Trips as Favourites

**Status:** `Planned`

As a user, I want to mark trips as favourites so that I can find important plans quickly.

### Acceptance Criteria

- Authenticated users can mark a trip as favourite.
- Favourite status is persisted.
- Users can remove favourite status.
- Favourite state is visible in the interface.
- Favourite trips can be filtered or listed.

### Tasks

- [ ] Add favourite data model
- [ ] Add favourite API operations
- [ ] Add favourite UI action
- [ ] Add favourite list or filter
- [ ] Add tests

---

## User Story 4.7: Export an Itinerary

**Status:** `Optional`

As a user, I want to export an itinerary so that I can use it outside the application.

### Acceptance Criteria

- An export format is selected.
- The exported content includes the day-by-day itinerary.
- The output is readable.
- Export does not expose private data.
- Export errors are handled.

### Possible Formats

- PDF
- printable page
- calendar events

### Tasks

- [ ] Select initial export format
- [ ] Define export layout
- [ ] Implement export action
- [ ] Add privacy checks
- [ ] Add tests

---

# Epic 5: Platform, Delivery, and Observability

## Goal

Provide reliable local development, automated testing, deployment, and monitoring.

## User Story 5.1: Run the Application with Docker Compose

**Status:** `Implemented`

As a developer, I want to start the complete application with Docker Compose so that local setup is reproducible.

### Acceptance Criteria

- Required services are defined in Docker Compose.
- Service dependencies are configured.
- Environment variables are loaded from a local environment file.
- Persistent services use named volumes where required.
- The stack can be started and stopped consistently.
- Secrets are not committed.

### Tasks

- [x] Add PostgreSQL
- [x] Add Auth Service
- [x] Add Trip Service
- [x] Add GenAI Service
- [x] Add frontend
- [x] Add NGINX Gateway
- [x] Add persistent volumes
- [x] Add health checks
- [x] Document local setup

---

## User Story 5.2: Route APIs Through an API Gateway

**Status:** `Implemented`

As a frontend developer, I want a single API entrypoint so that the client does not depend on individual service addresses.

### Acceptance Criteria

- NGINX provides one local API entrypoint.
- Auth routes are forwarded correctly.
- Trip routes are forwarded correctly.
- GenAI routes are forwarded correctly.
- Public API paths remain consistent.
- Gateway failures can be diagnosed through logs.

### Tasks

- [x] Add NGINX configuration
- [x] Configure Auth routes
- [x] Configure Trip routes
- [x] Configure GenAI routes
- [x] Add gateway container
- [x] Document route mapping

---

## User Story 5.3: Run Continuous Integration

**Status:** `Implemented`

As a developer, I want automated checks so that invalid changes are detected before merge.

### Acceptance Criteria

- CI runs on the configured branch and pull request events.
- Frontend checks run.
- Backend tests run.
- GenAI tests run.
- Docker Compose configuration is validated.
- Terraform configuration is validated.
- Ansible configuration is validated.
- Failed checks block unsafe changes according to repository rules.

### Tasks

- [x] Create CI workflow
- [x] Add frontend checks
- [x] Add backend checks
- [x] Add GenAI checks
- [x] Add Docker Compose validation
- [x] Add Terraform validation
- [x] Add Ansible validation

---

## User Story 5.4: Build and Deploy Through Continuous Delivery

**Status:** `Implemented`

As a developer, I want automated delivery so that application images and deployments can be produced consistently.

### Acceptance Criteria

- Container images are built automatically.
- Images are pushed to the configured registry.
- Deployment targets are configurable.
- Kubernetes deployment is supported.
- Azure VM deployment is supported.
- Secrets are stored outside the repository.

### Tasks

- [x] Create CD workflow
- [x] Build application images
- [x] Push images to the registry
- [x] Add Kubernetes deployment
- [x] Add Azure VM deployment
- [x] Configure secret usage
- [x] Document deployment flows

---

## User Story 5.5: Deploy to Kubernetes with Helm

**Status:** `Implemented`

As a developer, I want a Helm-based Kubernetes deployment so that the application can be installed and updated consistently.

### Acceptance Criteria

- A Helm chart exists.
- Required services are represented.
- Deployment values are configurable.
- Secrets are not hard-coded.
- The release can be installed or upgraded.
- Deployment verification is documented.

### Tasks

- [x] Create Helm chart
- [x] Add application workloads
- [x] Add services
- [x] Add ingress
- [x] Add configurable values
- [x] Add deployment documentation

---

## User Story 5.6: Provision Azure Infrastructure

**Status:** `Implemented`

As a developer, I want infrastructure automation so that Azure resources and VM deployment can be reproduced.

### Acceptance Criteria

- Terraform defines the required Azure resources.
- Terraform configuration can be validated.
- Ansible configures the target VM.
- Application deployment is automated.
- Credentials are supplied securely.

### Tasks

- [x] Add Terraform configuration
- [x] Add Terraform validation
- [x] Add Ansible inventory and playbooks
- [x] Configure Docker deployment
- [x] Integrate with CD
- [x] Document the workflow

---

## User Story 5.7: Collect Application Metrics

**Status:** `Implemented`

As a developer, I want Prometheus to collect service metrics so that runtime behavior can be observed.

### Acceptance Criteria

- Auth Service exposes Prometheus-compatible metrics.
- Trip Service exposes Prometheus-compatible metrics.
- GenAI Service exposes Prometheus-compatible metrics.
- Prometheus scrapes all configured services.
- Target status can be verified.

### Tasks

- [x] Enable Auth Service metrics
- [x] Enable Trip Service metrics
- [x] Add FastAPI metrics instrumentation
- [x] Configure Prometheus scrape jobs
- [x] Add Prometheus to Docker Compose
- [x] Verify targets

---

## User Story 5.8: Visualize Metrics in Grafana

**Status:** `Implemented`

As a developer, I want Grafana dashboards so that application health and HTTP behavior can be inspected.

### Acceptance Criteria

- Grafana runs in the local stack.
- Prometheus is provisioned as the default datasource.
- The application dashboard is stored in the repository.
- The dashboard is provisioned automatically.
- The dashboard includes availability, request rate, error rate, and latency.
- Dashboard configuration survives container recreation through repository provisioning.

### Tasks

- [x] Add Grafana to Docker Compose
- [x] Provision Prometheus datasource
- [x] Create dashboard provisioning
- [x] Add application dashboard
- [x] Add service availability panels
- [x] Add request rate panels
- [x] Add error rate panels
- [x] Add latency panels
- [x] Document Grafana usage

---

# Epic 6: Documentation and Project Quality

## Goal

Keep project documentation accurate, consistent, and aligned with the implemented system.

## User Story 6.1: Maintain Project Documentation

**Status:** `Ongoing`

As a developer, I want current project documentation so that contributors can understand, run, test, and deploy the system.

### Acceptance Criteria

- The root README reflects the current project.
- The system overview reflects the implemented architecture.
- The launch guide works from a clean checkout.
- Infrastructure documentation covers local operations.
- GenAI documentation reflects current providers and endpoints.
- Kubernetes and infrastructure automation are documented.
- Implemented and planned functionality are clearly separated.
- Duplicate instructions are minimized.
- No secrets are included.

### Tasks

- [ ] Update `README.md`
- [x] Update `docs/system-overview.md`
- [x] Update `docs/problem-statement.md`
- [x] Update `docs/how-to-launch.md`
- [ ] Update `docs/product-backlog.md`
- [ ] Update `infra/README.md`
- [ ] Update `genai/README.md`
- [ ] Update `infra/helm/README.md`
- [ ] Update `docs/infrastructure-automation.md`
- [ ] Review `CONTRIBUTING.md`
- [ ] Validate internal links
- [ ] Remove obsolete documentation

---

## User Story 6.2: Maintain Contribution Rules

**Status:** `Implemented / Ongoing`

As a contributor, I want a consistent development workflow so that changes remain small, testable, and reviewable.

### Acceptance Criteria

- `CONTRIBUTING.md` exists.
- Work starts from the latest `develop`.
- Each issue uses a dedicated branch.
- Pull requests target `develop`.
- Relevant tests must pass.
- Documentation is updated with behavior changes.
- Secrets are never committed.
- Merge and review rules are documented.

### Tasks

- [x] Create contribution guide
- [x] Define branching strategy
- [x] Define pull request rules
- [x] Define secret-handling rules
- [ ] Review all rules against the current repository workflow
- [ ] Update outdated examples

---

# Prioritization

## Completed MVP

The current MVP includes:

- destination input
- start and end date selection
- travel experience selection
- itinerary generation
- registration and login
- trip persistence
- link-based sharing
- Docker Compose setup
- API Gateway
- CI/CD
- Kubernetes deployment
- Azure automation
- Prometheus monitoring
- Grafana dashboards

## Next Recommended Work

1. Complete the documentation audit.
2. Verify the GenAI suggestion endpoint integration across frontend and backend.
3. Complete end-to-end budget integration only if it remains in the agreed scope.
4. Improve automated integration and end-to-end tests.
5. Address optional itinerary experience improvements only after required project work is complete.

## Lower-Priority Enhancements

- interactive maps
- route optimization
- drag-and-drop editing
- favourites
- export
- collaborative editing
- weather-aware planning
- monitoring notifications

# Backlog Maintenance Rules

- Update story status when implementation changes.
- Do not mark a feature as implemented until the end-to-end user flow works.
- Distinguish API-level capability from complete user-facing functionality.
- Keep completed stories for project traceability.
- Move obsolete stories to an archive rather than silently deleting historical scope.
- Create separate issues for implementation work discovered during documentation review.
- Keep acceptance criteria testable and specific.
- Do not include credentials, tokens, or private infrastructure details.