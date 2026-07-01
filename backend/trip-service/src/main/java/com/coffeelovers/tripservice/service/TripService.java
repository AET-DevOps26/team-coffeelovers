package com.coffeelovers.tripservice.service;

import com.coffeelovers.tripservice.dto.CreateTripRequest;
import com.coffeelovers.tripservice.dto.TripResponse;
import com.coffeelovers.tripservice.exception.TripNotFoundException;
import com.coffeelovers.tripservice.mapper.TripMapper;
import com.coffeelovers.tripservice.model.Trip;
import com.coffeelovers.tripservice.repository.TripRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final TripMapper tripMapper;

    public TripService(TripRepository tripRepository, TripMapper tripMapper) {
        this.tripRepository = tripRepository;
        this.tripMapper = tripMapper;
    }

    public TripResponse createTrip(CreateTripRequest request) {
        validateDateRange(request.startDate(), request.endDate());

        Trip trip = tripMapper.toEntity(request);
        Trip savedTrip = tripRepository.save(trip);

        return tripMapper.toResponse(savedTrip);
    }

    public TripResponse getTripById(UUID id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException(id));

        return tripMapper.toResponse(trip);
    }

    public List<TripResponse> getAllTrips() {
        return tripRepository.findAll()
                .stream()
                .map(tripMapper::toResponse)
                .toList();
    }

    public List<TripResponse> getTripsByUserId(Long userId) {
        return tripRepository.findByUserId(userId)
                .stream()
                .map(tripMapper::toResponse)
                .toList();
    }

    private void validateDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date must not be before start date");
        }
    }
}
