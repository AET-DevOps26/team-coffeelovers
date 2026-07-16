package com.coffeelovers.tripservice.dto;

import com.coffeelovers.tripservice.model.TripType;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record SharedTripResponse(
        UUID id,
        UUID tripId,
        String destination,
        LocalDate startDate,
        LocalDate endDate,
        TripType tripType,
        String authorUsername,
        Instant savedAt
) {}
