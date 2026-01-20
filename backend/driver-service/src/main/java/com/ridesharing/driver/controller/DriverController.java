package com.ridesharing.driver.controller;

import com.ridesharing.driver.dto.LocationUpdateDTO;
import com.ridesharing.driver.model.Driver;
import com.ridesharing.driver.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService service;

    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriver(@PathVariable Long id) {
        return ResponseEntity.ok(service.getDriver(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Driver> updateStatus(@PathVariable Long id, @RequestParam Driver.Status status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @PatchMapping("/{id}/location")
    public ResponseEntity<Void> updateLocation(@PathVariable Long id, @RequestBody LocationUpdateDTO location) {
        service.updateLocation(id, location.getLatitude(), location.getLongitude());
        return ResponseEntity.ok().build();
    }
}
