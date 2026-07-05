package com.coffeelovers.tripservice.controller;

import com.coffeelovers.tripservice.dto.CreateTripRequest;
import com.coffeelovers.tripservice.dto.GenerateItineraryPreviewRequest;
import com.coffeelovers.tripservice.dto.GenerateTripItineraryRequest;
import com.coffeelovers.tripservice.dto.TripResponse;
import com.coffeelovers.tripservice.dto.genai.GenerateItineraryResponse;
import com.coffeelovers.tripservice.service.TripService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TripResponse createTrip(
            @Valid @RequestBody CreateTripRequest request) {

        return tripService.createTrip(request);
    }

    @GetMapping("/{id}")
    public TripResponse getTripById(
            @PathVariable UUID id) {

        return tripService.getTripById(id);
    }

    @GetMapping
    public List<TripResponse> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/user/{userId}")
    public List<TripResponse> getTripsByUserId(
            @PathVariable Long userId) {

        return tripService.getTripsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrip(@PathVariable UUID id) {
        tripService.deleteTrip(id);
    }

    @PostMapping("/generate")
    public GenerateItineraryResponse generatePreview(
            @Valid @RequestBody GenerateItineraryPreviewRequest request) {

        return tripService.generatePreview(request);
    }

    @PostMapping("/{id}/itinerary")
    public GenerateItineraryResponse generateItinerary(
            @PathVariable UUID id,
            @Valid @RequestBody GenerateTripItineraryRequest request) {

        return tripService.generateItinerary(id, request);
    }
}
