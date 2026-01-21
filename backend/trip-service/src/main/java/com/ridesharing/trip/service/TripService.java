package com.ridesharing.trip.service;

import com.ridesharing.trip.model.Trip;
import com.ridesharing.trip.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository repository;

    public Trip getTrip(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
    }

    @Transactional
    public Trip createTrip(Trip trip) {
        trip.setStatus(Trip.TripStatus.CREATED);
        trip.setCreatedAt(LocalDateTime.now());
        return repository.save(trip);
    }

    @Transactional
    public Trip updateStatus(Long id, Trip.TripStatus status) {
        Trip trip = getTrip(id);
        trip.setStatus(status);
        if (status == Trip.TripStatus.STARTED) {
            trip.setStartedAt(LocalDateTime.now());
        } else if (status == Trip.TripStatus.COMPLETED) {
            trip.setCompletedAt(LocalDateTime.now());
        }
        return repository.save(trip);
    }
}
