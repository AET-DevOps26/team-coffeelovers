package com.coffeelovers.tripservice.repository;

import com.coffeelovers.tripservice.model.Trip;
import com.coffeelovers.tripservice.model.TripStatus;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, UUID> {

    List<Trip> findByUserId(UUID userId);

    List<Trip> findByStatus(TripStatus status);

    List<Trip> findByUserIdAndStatus(UUID userId, TripStatus status);
}