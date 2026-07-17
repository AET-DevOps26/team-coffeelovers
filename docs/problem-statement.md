# Problem Statement: AI Travel Planner

## 1. Overview

AI Travel Planner is a web application that helps users create personalized travel itineraries with the support of Generative AI.

Users provide:

- a destination
- a start date
- an end date
- a preferred travel experience

Based on this information, the application generates a structured travel itinerary.

The goal is to make travel planning faster, easier, and more personalized.

## 2. Problem

Planning a trip often requires searching across multiple websites, comparing attractions, selecting suitable activities, and organizing them across several days.

This process can be difficult for users who:

- are visiting a destination for the first time
- have limited time to research
- are unsure which attractions match their interests
- want a clear itinerary instead of a list of disconnected recommendations
- need a simple way to save and share their travel plan

Users may spend significant time researching without knowing whether the final plan is balanced or suitable for their travel preferences.

## 3. Proposed Solution

AI Travel Planner simplifies this process by generating a personalized itinerary from a small set of inputs.

The user selects:

1. a travel destination
2. the start and end dates
3. a preferred travel experience

The application then generates a structured itinerary containing activity suggestions for the selected destination and travel period.

Registered users can save generated trips and share them through a link.

## 4. Current User Input

The current trip planning form collects the following information.

### Destination

The city or destination the user wants to visit.

### Travel Dates

The user selects:

- a start date
- an end date

These dates define the duration of the trip.

### Travel Experience

The user selects the type of experience they are looking for.

Current options include:

- Popular Attractions
- Historical
- Outdoor Activities
- Food & Culture
- Mixed Trip

The selected experience is used to personalize the generated itinerary.

## 5. Generated Result

The application produces a structured travel plan containing:

- a summary of the trip
- a day-by-day itinerary
- suggested activities
- descriptions of recommended places
- recommendations aligned with the selected travel experience

The generated plan is intended to provide a useful starting point for the user's trip.

## 6. Current Features

The current application supports:

- destination input
- start and end date selection
- travel experience selection
- AI-generated travel itineraries
- user registration
- user login
- saving trips
- sharing trips through a generated link

## 7. Intended Users

AI Travel Planner is intended for:

- tourists visiting a destination for the first time
- students planning short trips
- travelers with limited time for research
- users looking for recommendations based on their interests
- groups of friends planning a trip
- users who want to save or share an itinerary
- travelers who need a quick first draft of their travel plan

## 8. Example Usage Scenarios

### Popular Attractions

A user selects Paris, chooses travel dates, and selects **Popular Attractions**.

The application generates an itinerary containing well-known attractions and activities organized across the selected days.

### Historical Trip

A user selects Rome and chooses **Historical**.

The generated itinerary focuses on historical landmarks, museums, and cultural sites.

### Outdoor Activities

A user selects Munich and chooses **Outdoor Activities**.

The application recommends parks, walking areas, viewpoints, and outdoor experiences.

### Food and Culture

A user selects Barcelona and chooses **Food & Culture**.

The resulting itinerary includes cultural attractions, neighborhoods, markets, and food-related experiences.

### Mixed Trip

A user selects a destination and chooses **Mixed Trip**.

The application generates a balanced itinerary containing different types of attractions and activities.

## 9. Current Limitations

The current version does not yet provide complete support for:

- budget input in the frontend
- budget-aware itinerary generation across the full application
- interactive map visualization
- verified route optimization
- real-time travel duration
- weather-aware planning
- real-time opening hours
- drag-and-drop itinerary editing
- activity replacement
- favourites

The GenAI service supports optional budget information at the API level, but this capability is not yet integrated into the complete user workflow.

Generated recommendations may include information that changes over time. Users should verify details such as opening hours, ticket prices, transportation availability, and temporary closures.

## 10. Future Improvements

Possible future improvements include:

- frontend budget input
- end-to-end budget-aware planning
- interactive maps
- route and travel-time optimization
- activity reordering and replacement
- favourite trips
- weather-based recommendations
- richer activity details
- collaborative trip planning
- itinerary export

## 11. Product Scope

AI Travel Planner is a travel planning assistant.

It provides itinerary recommendations but does not replace official travel, transportation, weather, or safety information.

Users remain responsible for verifying time-sensitive details before following a generated itinerary.