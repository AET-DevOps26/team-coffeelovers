# Product Backlog: AI Travel Planner

## Navigation

- Scope and context: [1. Overview](#1-overview)
- Epic groups and planning phases: [2. Epics](#2-epics)
- Direct epic links:
	- [Epic 1: Trip Input and AI Planning](#epic-1-trip-input-and-ai-planning)
	- [Epic 2: Itinerary, Maps, and Editing](#epic-2-itinerary-maps-and-editing)
	- [Epic 3: Accounts, Favorites, and Sharing](#epic-3-accounts-favorites-and-sharing)
	- [Epic 4: Platform and Delivery](#epic-4-platform-and-delivery)

## 1. Overview

This product backlog defines the main epics and user stories for the AI Travel Planner application.

The backlog is organized into epics. Each epic contains user stories, acceptance criteria, and possible tasks.

### Note

This backlog is a living document and should be updated as the project scope becomes clearer.

---

## 2. Epics

The epics are grouped by delivery phase so the backlog is easier to scan and prioritize:

### Phase 1: Core Travel Planning

These epics cover the main planning flow from trip input to itinerary editing.

- Epic 1: Trip Input and AI Planning
- Epic 2: Itinerary, Maps, and Editing

### Phase 2: User Growth and Collaboration

These epics add account-based, saving, and sharing features after the core flow works.

- Epic 3: Accounts, Favorites, and Sharing

### Phase 3: Product Foundations

These epics support the frontend, backend, documentation, and quality checks.

- Epic 4: Platform and Delivery

---

## Epic 1: Trip Input and AI Planning

### Goal

Allow users to enter basic travel information so that the system can generate a personalized travel plan.

### Description

Users should be able to provide the destination, number of travel days, and travel preference. These inputs are used to create a trip request for the AI itinerary generation process.

### User Stories

#### User Story 1.1: Enter destination

As a visitor, I want to enter my travel destination so that the application knows where I want to travel.

##### Acceptance Criteria

- The user can enter a destination.
- The destination field is required.
- The system validates that the destination is not empty.
- The destination is included in the trip request.

##### Tasks

- [ ] Create destination input field
- [ ] Add validation for empty destination
- [ ] Store destination in trip request object

---

#### User Story 1.2: Enter number of travel days

As a visitor, I want to enter the number of travel days so that the application can generate a plan for the correct trip duration.

##### Acceptance Criteria

- The user can enter the number of days.
- The number of days is required.
- The value must be a positive number.
- The number of days is included in the trip request.

##### Tasks

- [ ] Create number of days input field
- [ ] Add validation for invalid day values
- [ ] Store trip duration in trip request object

---

#### User Story 1.3: Select travel preference

As a visitor, I want to select my travel preference so that the generated plan matches my interests.

##### Acceptance Criteria

- The user can select a travel preference.
- Available preferences include popular attractions, historical trip, outdoor activities, food and culture, relaxed trip, family-friendly trip, and mixed trip.
- The selected preference is included in the trip request.
- If no preference is selected, the system can use a default mixed trip preference.

##### Tasks

- [ ] Create travel preference selection component
- [ ] Add predefined travel preference options
- [ ] Add default preference handling
- [ ] Store selected preference in trip request object

#### User Story 1.4: Generate travel plan

As a visitor, I want to generate a travel plan from my trip details so that I can quickly receive an itinerary.

##### Acceptance Criteria

- The system sends the destination, number of days, and travel preference to the GenAI service.
- The AI returns a structured day-by-day itinerary.
- The itinerary includes morning, afternoon, and evening sections.
- Each activity has a title and short description.
- The generated plan is displayed to the user.

##### Tasks

- [ ] Create GenAI service interface
- [ ] Build prompt template for itinerary generation
- [ ] Send trip request to GenAI service
- [ ] Parse AI response
- [ ] Display generated itinerary on the frontend

---

## Epic 2: Itinerary, Maps, and Editing

### Goal

Show the generated travel plan in a clear and structured way and allow users to refine it with map support.

### Description

Users should be able to view their generated itinerary day by day, see recommended places on a map, and edit the plan by reordering, removing, or swapping activities.

### User Stories

#### User Story 2.1: View generated itinerary

As a visitor, I want to view my generated itinerary so that I can understand the suggested travel plan.

##### Acceptance Criteria

- The itinerary is displayed after generation.
- The plan is grouped by day.
- Each day contains activity sections.
- Each activity shows a title and short description.
- The layout is easy to read.

##### Tasks

- [ ] Create itinerary view component
- [ ] Create itinerary day component
- [ ] Create activity card component
- [ ] Display activities by day and time block

#### User Story 2.2: View activity details

As a visitor, I want to click on an activity to see more details so that I can better understand the recommendation.

##### Acceptance Criteria

- The user can click on an activity.
- A detail modal or detail view opens.
- The detail view includes description, address, estimated duration, and opening hours if available.
- The user can close the detail view.

##### Tasks

- [ ] Create activity details modal
- [ ] Add click behavior to activity cards
- [ ] Display available activity metadata
- [ ] Add close button for modal

#### User Story 2.3: Display recommended places on map

As a visitor, I want to see recommended places on a map so that I can understand where the activities are located.

##### Acceptance Criteria

- The map is displayed together with the itinerary.
- Recommended places are shown as markers.
- Each marker represents an activity or place.
- Clicking a marker shows basic place information.
- Map markers are connected to the generated itinerary.

##### Tasks

- [ ] Choose map provider or library
- [ ] Add map component
- [ ] Convert activity locations into map markers
- [ ] Display markers on the map
- [ ] Add marker click behavior

#### User Story 2.4: Group nearby places logically

As a visitor, I want the travel plan to group nearby places together so that the itinerary is realistic and easy to follow.

##### Acceptance Criteria

- The system considers location information when organizing activities.
- Nearby places can be grouped on the same day.
- The itinerary avoids unnecessary backtracking where possible.
- The generated plan follows a logical location order.

##### Tasks

- [ ] Include location-awareness in GenAI prompt
- [ ] Add location data to activity model
- [ ] Research basic route grouping approach
- [ ] Validate generated plan structure

#### User Story 2.5: Reorder activities

As a visitor, I want to reorder activities so that I can customize the travel plan according to my preferences.

##### Acceptance Criteria

- The user can change the order of activities.
- Activities can be reordered within the same day.
- Activities can be moved between different days if supported.
- The updated order is reflected in the itinerary view.
- The map view remains consistent with the updated plan.

##### Tasks

- [ ] Add drag-and-drop support
- [ ] Update itinerary state after reordering
- [ ] Support moving activities between days
- [ ] Sync map markers with updated itinerary

#### User Story 2.6: Remove activity from plan

As a visitor, I want to remove an activity from my travel plan so that I can exclude places I am not interested in.

##### Acceptance Criteria

- The user can remove an activity.
- The activity is removed from the itinerary.
- The related map marker is removed or hidden.
- The user receives visual confirmation.

##### Tasks

- [ ] Add remove button to activity cards
- [ ] Update itinerary state after removal
- [ ] Update map markers after removal
- [ ] Add confirmation or undo option if needed

#### User Story 2.7: Swap activity with alternative

As a visitor, I want to replace an activity with an AI-suggested alternative so that I can improve my itinerary.

##### Acceptance Criteria

- The user can request an alternative for an activity.
- The system suggests at least one replacement activity.
- The replacement matches the travel preference and location context.
- The selected alternative replaces the original activity in the itinerary.

##### Tasks

- [ ] Add swap activity button
- [ ] Create GenAI prompt for alternative suggestions
- [ ] Display alternative options
- [ ] Replace selected activity in itinerary state
- [ ] Update map marker for new activity

---

## Epic 3: Accounts, Favorites, and Sharing

### Goal

Allow users to create accounts, save plans, mark favorites, and share or export itineraries.

### Description

Visitors can use the basic planner features without an account. Registered users should be able to save, favorite, share, and export their travel plans.

### User Stories

#### User Story 3.1: Create account

As a visitor, I want to create an account so that I can save and manage my travel plans.

##### Acceptance Criteria

- The visitor can create an account.
- Required fields are validated.
- The user receives feedback after successful registration.
- The created account can be used for login.

##### Tasks

- [ ] Create registration page
- [ ] Add registration form validation
- [ ] Implement backend registration endpoint
- [ ] Store user data securely
- [ ] Display registration success or error messages

#### User Story 3.2: Login

As a user, I want to log in so that I can access my saved travel plans and favorites.

##### Acceptance Criteria

- The user can log in with valid credentials.
- Invalid login attempts show an error message.
- Logged-in users can access user-specific features.
- The application stores authentication state.

##### Tasks

- [ ] Create login page
- [ ] Add login form validation
- [ ] Implement backend login endpoint
- [ ] Manage authentication state
- [ ] Add logout functionality

#### User Story 3.3: Save travel plan

As a user, I want to save my generated travel plan so that I can access it later.

##### Acceptance Criteria

- Logged-in users can save a generated travel plan.
- Saved plans are linked to the user account.
- The user receives feedback after saving.
- Saved plans can be retrieved later.

##### Tasks

- [ ] Create travel plan persistence model
- [ ] Implement save travel plan endpoint
- [ ] Connect save button to backend
- [ ] Display save success or error message

#### User Story 3.4: Add travel plan to favorites

As a user, I want to add a travel plan to favorites so that I can quickly find important plans later.

##### Acceptance Criteria

- Logged-in users can add a travel plan to favorites.
- Users can remove a plan from favorites.
- Favorite status is visible in the UI.
- Favorite plans can be listed separately if supported.

##### Tasks

- [ ] Add favorite button
- [ ] Implement favorite/unfavorite endpoint
- [ ] Store favorite status
- [ ] Update UI based on favorite status

#### User Story 3.5: Share travel plan

As a user, I want to share my travel plan so that other people can view it.

##### Acceptance Criteria

- The user can share a generated travel plan.
- The system creates a shareable link or sharing method.
- Shared plans can be viewed by others.
- The user receives feedback after sharing.

##### Tasks

- [ ] Create share button
- [ ] Generate shareable plan link
- [ ] Create shared plan view
- [ ] Add access handling for shared plans

#### User Story 3.6: Export travel plan

As a visitor or user, I want to export my travel plan so that I can use it outside the application.

##### Acceptance Criteria

- The user can export the travel plan.
- The exported plan includes the itinerary details.
- The export includes day-by-day structure.
- The export format is easy to read.
- Export works for the currently generated plan.

##### Tasks

- [ ] Add export button
- [ ] Define export format
- [ ] Generate export file or printable view
- [ ] Include itinerary details in export

---

## Epic 4: Platform and Delivery

### Goal

Provide the frontend, backend, documentation, and code quality foundations for the product.

### Description

These epics support the application shell, the API layer, project documentation, and CI checks.

### User Stories

#### User Story 4.1: Build travel planner page

As a visitor, I want to use a clear travel planner page so that I can easily generate a travel plan.

##### Acceptance Criteria

- The page contains the required trip input fields.
- The page contains a generate button.
- The generated itinerary is shown on the same page or result page.
- The map is displayed with the generated plan.
- The interface is understandable for first-time users.

##### Tasks

- [ ] Create main travel planner page
- [ ] Add trip input form
- [ ] Add generate button
- [ ] Add itinerary result section
- [ ] Add map section

#### User Story 4.2: Add responsive design

As a visitor, I want the application to work on different screen sizes so that I can use it on desktop and mobile devices.

##### Acceptance Criteria

- The page works on common desktop screen sizes.
- The page works on common mobile screen sizes.
- Forms, itinerary cards, and maps remain usable.
- The layout does not break on smaller screens.

##### Tasks

- [ ] Define responsive layout
- [ ] Test UI on desktop
- [ ] Test UI on mobile
- [ ] Adjust spacing and component sizes

#### User Story 4.3: Create trip generation API

As a frontend developer, I want a backend endpoint for trip generation so that the frontend can request AI-generated itineraries.

##### Acceptance Criteria

- The backend provides an endpoint for generating a travel plan.
- The endpoint accepts destination, number of days, and travel preference.
- The endpoint returns a structured travel plan response.
- Invalid requests return clear error messages.

##### Tasks

- [ ] Define trip request DTO/model
- [ ] Define travel plan response DTO/model
- [ ] Create trip generation endpoint
- [ ] Connect endpoint to GenAI service
- [ ] Add request validation

#### User Story 4.4: Define domain model

As a developer, I want to define the main domain objects so that the application has a clear data structure.

##### Acceptance Criteria

- The main domain objects are defined.
- The model includes User, TripRequest, TravelPlan, ItineraryDay, Activity, and GenAIService.
- Relationships between objects are clear.
- The model supports map-related data for activities.

##### Tasks

- [ ] Define User model
- [ ] Define TripRequest model
- [ ] Define TravelPlan model
- [ ] Define ItineraryDay model
- [ ] Define Activity model
- [ ] Add location fields to Activity model
- [ ] Document model relationships

#### User Story 4.5: Create contribution guide

As a developer, I want a contribution guide so that all team members follow the same workflow and branching rules.

##### Acceptance Criteria

- `CONTRIBUTING.md` exists in the root directory.
- The guide explains the Git workflow.
- Branch naming rules are included.
- Pull request expectations are described.

##### Tasks

- [ ] Create `CONTRIBUTING.md`
- [ ] Add Git branching strategy
- [ ] Add branch naming convention
- [ ] Add pull request rules

#### User Story 4.6: Document CI setup

As a developer, I want CI setup documentation so that the team understands how automated checks work.

##### Acceptance Criteria

- CI documentation is stored in `docs/ci-setup.md`.
- The document explains the GitHub Actions workflow.
- The document explains when the pipeline runs.

##### Tasks

- [ ] Create or update `docs/ci-setup.md`
- [ ] Explain workflow triggers

#### User Story 4.7: Set up initial GitHub Actions lint pipeline

As a developer, I want an initial GitHub Actions pipeline so that code and documentation quality can be checked automatically.

##### Acceptance Criteria

- The workflow is stored in `.github/workflows/ci.yml`.
- The pipeline runs on push and/or pull request.
- Python linting is included.
- Markdown linting is included.
- Markdown lint configuration is stored in `.markdownlint.json`.
- Python lint configuration is stored in `pyproject.toml`.
- The pipeline fails if linting errors exist.
- The pipeline passes if all lint checks are successful.

##### Tasks

- [ ] Create GitHub Actions workflow
- [ ] Configure Python linting
- [ ] Configure Markdown linting
- [ ] Add Markdown lint config
- [ ] Add Python lint config
- [ ] Test workflow in GitHub Actions

---
