package com.coffeelovers.tripservice.service;

import com.coffeelovers.tripservice.client.GenAiClient;
import com.coffeelovers.tripservice.dto.CreateTripRequest;
import com.coffeelovers.tripservice.dto.GenerateItineraryPreviewRequest;
import com.coffeelovers.tripservice.dto.GenerateTripItineraryRequest;
import com.coffeelovers.tripservice.dto.SharedTripResponse;
import com.coffeelovers.tripservice.dto.TripResponse;
import com.coffeelovers.tripservice.dto.genai.BudgetDto;
import com.coffeelovers.tripservice.dto.genai.GenerateItineraryRequest;
import com.coffeelovers.tripservice.dto.genai.GenerateItineraryResponse;
import com.coffeelovers.tripservice.exception.TripNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import com.coffeelovers.tripservice.mapper.TripMapper;
import com.coffeelovers.tripservice.model.SharedTrip;
import com.coffeelovers.tripservice.model.Trip;
import com.coffeelovers.tripservice.repository.SharedTripRepository;
import com.coffeelovers.tripservice.repository.TripRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class TripService {

    private static final com.fasterxml.jackson.databind.ObjectMapper MAPPER =
            new com.fasterxml.jackson.databind.ObjectMapper()
                .findAndRegisterModules();

    private final TripRepository tripRepository;
    private final SharedTripRepository sharedTripRepository;
    private final TripMapper tripMapper;
    private final GenAiClient genAiClient;

    public TripService(TripRepository tripRepository, SharedTripRepository sharedTripRepository, TripMapper tripMapper, GenAiClient genAiClient) {
        this.tripRepository = tripRepository;
        this.sharedTripRepository = sharedTripRepository;
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

        if (trip.getItineraryJson() != null) {
            try {
                return MAPPER.readValue(trip.getItineraryJson(), GenerateItineraryResponse.class);
            } catch (Exception ignored) {}
        }

        long days = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
        GenerateItineraryRequest genAiRequest = new GenerateItineraryRequest(
                trip.getDestination(),
                days,
                request.preferences(),
                new BudgetDto(trip.getBudget(), request.currency())
        );

        GenerateItineraryResponse response = genAiClient.generateItinerary(genAiRequest);

        try {
            trip.setItineraryJson(MAPPER.writeValueAsString(response));
            tripRepository.save(trip);
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(TripService.class)
                    .warn("Failed to cache itineraryJson for trip {}: {}", tripId, e.getMessage());
        }

        return response;
    }

    public GenerateItineraryResponse generatePreview(GenerateItineraryPreviewRequest request) {
        GenerateItineraryRequest genAiRequest = new GenerateItineraryRequest(
                request.destination(),
                request.days(),
                request.preferences(),
                new BudgetDto(java.math.BigDecimal.ZERO, request.currency())
        );
        return genAiClient.generateItinerary(genAiRequest);
    }

    public void deleteTrip(UUID id) {
        if (!tripRepository.existsById(id)) {
            throw new TripNotFoundException(id);
        }
        tripRepository.deleteById(id);
    }

    public SharedTripResponse saveSharedTrip(UUID tripId, Long userId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException(tripId));

        return sharedTripRepository.findBySavedByUserIdAndTripId(userId, tripId)
                .map(this::toSharedTripResponse)
                .orElseGet(() -> {
                    try {
                        SharedTrip saved = sharedTripRepository.save(SharedTrip.create(userId, trip));
                        return toSharedTripResponse(saved);
                    } catch (DataIntegrityViolationException e) {
                        return sharedTripRepository.findBySavedByUserIdAndTripId(userId, tripId)
                                .map(this::toSharedTripResponse)
                                .orElseThrow(() -> e);
                    }
                });
    }

    public List<SharedTripResponse> getSharedTrips(Long userId) {
        return sharedTripRepository.findBySavedByUserId(userId)
                .stream()
                .map(this::toSharedTripResponse)
                .toList();
    }

    private SharedTripResponse toSharedTripResponse(SharedTrip s) {
        return new SharedTripResponse(
                s.getId(),
                s.getTripId(),
                s.getDestination(),
                s.getStartDate(),
                s.getEndDate(),
                s.getTripType(),
                s.getAuthorUsername(),
                s.getSavedAt()
        );
    }

    private void validateDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date must not be before start date");
        }
    }
}
