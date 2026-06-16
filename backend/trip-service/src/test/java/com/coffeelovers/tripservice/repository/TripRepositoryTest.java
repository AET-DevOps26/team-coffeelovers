package com.coffeelovers.tripservice.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.coffeelovers.tripservice.model.Trip;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.data.jpa.repository.JpaRepository;

class TripRepositoryTest {

    @Test
    void repositoryExtendsJpaRepository() {
        assertThat(JpaRepository.class).isAssignableFrom(TripRepository.class);
    }

    @Test
    void repositoryUsesTripEntityAndUuidPrimaryKey() {
        assertThat(TripRepository.class.getGenericInterfaces()[0].getTypeName())
                .contains(Trip.class.getName())
                .contains(UUID.class.getName());
    }
}