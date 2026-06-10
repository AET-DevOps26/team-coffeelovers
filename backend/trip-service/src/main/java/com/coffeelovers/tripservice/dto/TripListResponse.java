package com.coffeelovers.tripservice.dto;

import java.util.List;

public record TripListResponse(
        List<TripResponse> trips
) {
}