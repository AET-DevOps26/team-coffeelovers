package com.coffeelovers.tripservice.dto.genai;

public record GenAiActivityDto(
        String title,
        String description,
        String location,
        String estimatedDuration,
        BudgetDto estimatedCost,
        String category
) {
}
