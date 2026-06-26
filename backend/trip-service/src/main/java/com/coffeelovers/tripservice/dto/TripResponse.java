package com.coffeelovers.tripservice.dto;

import com.coffeelovers.tripservice.model.TripStatus;
import com.coffeelovers.tripservice.model.TripType;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record TripResponse(
        UUID id,
        Long userId,
        String destination,
        LocalDate startDate,
        LocalDate endDate,
        TripType tripType,
        BigDecimal budget,
        TripStatus status,
        Instant createdAt,
        Instant updatedAt
) {
}
