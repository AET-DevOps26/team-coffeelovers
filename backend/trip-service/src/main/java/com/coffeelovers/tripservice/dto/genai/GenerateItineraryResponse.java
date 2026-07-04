package com.coffeelovers.tripservice.dto.genai;

import java.util.List;

public record GenerateItineraryResponse(
        String summary,
        List<GenAiItineraryDayDto> itinerary,
        List<GenAiActivityDto> activities
) {
}
