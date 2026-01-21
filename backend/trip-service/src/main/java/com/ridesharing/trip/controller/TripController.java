package com.ridesharing.trip.controller;

import com.ridesharing.trip.model.Trip;
import com.ridesharing.trip.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService service;

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTrip(@PathVariable Long id) {
        return ResponseEntity.ok(service.getTrip(id));
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        return ResponseEntity.ok(service.createTrip(trip));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Trip> updateStatus(@PathVariable Long id, @RequestParam Trip.TripStatus status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }
}
