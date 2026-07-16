package com.coffeelovers.tripservice.repository;

import com.coffeelovers.tripservice.model.SharedTrip;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SharedTripRepository extends JpaRepository<SharedTrip, UUID> {

    List<SharedTrip> findBySavedByUserId(Long savedByUserId);

    Optional<SharedTrip> findBySavedByUserIdAndTripId(Long savedByUserId, UUID tripId);
}
