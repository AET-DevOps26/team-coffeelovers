package com.coffeelovers.tripservice.dto.genai;

import java.util.List;

public record GenerateItineraryRequest(
        String destination,
        long days,
        List<String> preferences,
        BudgetDto budget
) {
}
