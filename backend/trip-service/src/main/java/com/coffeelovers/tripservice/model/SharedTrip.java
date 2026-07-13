package com.coffeelovers.tripservice.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "shared_trips")
public class SharedTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Long savedByUserId;

    @Column(nullable = false)
    private UUID tripId;

    @Column
    private String authorUsername;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TripType tripType;

    @Column(nullable = false, updatable = false)
    private Instant savedAt;

    protected SharedTrip() {}

    public static SharedTrip create(Long savedByUserId, Trip trip) {
        SharedTrip s = new SharedTrip();
        s.savedByUserId = savedByUserId;
        s.tripId = trip.getId();
        s.authorUsername = trip.getAuthorUsername();
        s.destination = trip.getDestination();
        s.startDate = trip.getStartDate();
        s.endDate = trip.getEndDate();
        s.tripType = trip.getTripType();
        return s;
    }

    @PrePersist
    void onCreate() {
        savedAt = Instant.now();
    }

    public UUID getId() { return id; }
    public Long getSavedByUserId() { return savedByUserId; }
    public UUID getTripId() { return tripId; }
    public String getAuthorUsername() { return authorUsername; }
    public String getDestination() { return destination; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public TripType getTripType() { return tripType; }
    public Instant getSavedAt() { return savedAt; }
}
