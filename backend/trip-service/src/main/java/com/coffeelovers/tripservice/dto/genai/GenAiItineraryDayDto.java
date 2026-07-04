package com.coffeelovers.tripservice.dto.genai;

import java.util.List;

public record GenAiItineraryDayDto(
        int day,
        String title,
        List<GenAiActivityDto> activities
) {
}
