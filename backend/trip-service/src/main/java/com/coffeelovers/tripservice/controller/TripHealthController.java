package com.coffeelovers.tripservice.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TripHealthController {

    @GetMapping("/trips/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "trip-service",
                "status", "UP"
        );
    }
}