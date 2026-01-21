package com.ridesharing.rider.controller;

import com.ridesharing.rider.model.Rider;
import com.ridesharing.rider.service.RiderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/riders")
@RequiredArgsConstructor
public class RiderController {

    private final RiderService service;

    @GetMapping("/{id}")
    public ResponseEntity<Rider> getRider(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRider(id));
    }

    @PostMapping
    public ResponseEntity<Rider> createRider(@RequestBody Rider rider) {
        return ResponseEntity.ok(service.createRider(rider));
    }
}
