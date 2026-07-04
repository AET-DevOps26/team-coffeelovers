package com.coffeelovers.tripservice.service;

import com.coffeelovers.tripservice.client.GenAiClient;
import com.coffeelovers.tripservice.dto.CreateTripRequest;
import com.coffeelovers.tripservice.dto.GenerateTripItineraryRequest;
import com.coffeelovers.tripservice.dto.TripResponse;
import com.coffeelovers.tripservice.dto.genai.BudgetDto;
import com.coffeelovers.tripservice.dto.genai.GenerateItineraryRequest;
import com.coffeelovers.tripservice.dto.genai.GenerateItineraryResponse;
import com.coffeelovers.tripservice.exception.TripNotFoundException;
import com.coffeelovers.tripservice.mapper.TripMapper;
import com.coffeelovers.tripservice.model.Trip;
import com.coffeelovers.tripservice.repository.TripRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final TripMapper tripMapper;
    private final GenAiClient genAiClient;

    public TripService(TripRepository tripRepository, TripMapper tripMapper, GenAiClient genAiClient) {
        this.tripRepository = tripRepository;
        this.tripMapper = tripMapper;
        this.genAiClient = genAiClient;
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

    public GenerateItineraryResponse generateItinerary(UUID tripId, GenerateTripItineraryRequest request) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException(tripId));

        long days = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
        GenerateItineraryRequest genAiRequest = new GenerateItineraryRequest(
                trip.getDestination(),
                days,
                request.preferences(),
                new BudgetDto(trip.getBudget(), request.currency())
        );

        return genAiClient.generateItinerary(genAiRequest);
    }

    private void validateDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date must not be before start date");
        }
    }
}
