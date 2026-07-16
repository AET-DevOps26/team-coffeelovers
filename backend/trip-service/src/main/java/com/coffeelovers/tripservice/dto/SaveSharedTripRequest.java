package com.coffeelovers.tripservice.dto;

import jakarta.validation.constraints.NotNull;

public record SaveSharedTripRequest(@NotNull Long userId) {}
