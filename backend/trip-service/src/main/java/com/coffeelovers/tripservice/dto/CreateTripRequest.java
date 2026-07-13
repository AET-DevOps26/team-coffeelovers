package com.coffeelovers.tripservice.dto;

import com.coffeelovers.tripservice.model.TripType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateTripRequest(
        @NotNull Long userId,
        String authorUsername,
        @NotBlank String destination,
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        @NotNull TripType tripType,
        @NotNull @PositiveOrZero BigDecimal budget
) {
}
