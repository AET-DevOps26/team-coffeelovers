package com.coffeelovers.tripservice.mapper;

import com.coffeelovers.tripservice.dto.CreateTripRequest;
import com.coffeelovers.tripservice.dto.TripResponse;
import com.coffeelovers.tripservice.model.Trip;
import com.coffeelovers.tripservice.model.TripStatus;
import org.springframework.stereotype.Component;

@Component
public class TripMapper {

    public Trip toEntity(CreateTripRequest request) {
        return Trip.create(
                request.userId(),
                request.destination(),
                request.startDate(),
                request.endDate(),
                request.tripType(),
                request.budget()
        );
    }

    public TripResponse toResponse(Trip trip) {
        return new TripResponse(
                trip.getId(),
                trip.getUserId(),
                trip.getDestination(),
                trip.getStartDate(),
                trip.getEndDate(),
                trip.getTripType(),
                trip.getBudget(),
                trip.getStatus(),
                trip.getCreatedAt(),
                trip.getUpdatedAt()
        );
    }
}