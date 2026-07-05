package com.coffeelovers.tripservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record GenerateTripItineraryRequest(
        @NotEmpty List<String> preferences,
        @NotBlank String currency
) {
}
