package com.coffeelovers.tripservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record GenerateItineraryPreviewRequest(
        @NotBlank String destination,
        @Min(1) int days,
        @NotEmpty List<String> preferences,
        @NotBlank String currency
) {
}
