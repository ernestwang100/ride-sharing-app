package com.ridesharing.match.controller;

import com.ridesharing.match.dto.NearbyDriverDTO;
import com.ridesharing.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService service;

    @GetMapping("/nearby")
    public ResponseEntity<List<NearbyDriverDTO>> findNearbyDrivers(
            @RequestParam Double lat,
            @RequestParam Double lon,
            @RequestParam(defaultValue = "5.0") Double radius) {
        return ResponseEntity.ok(service.findNearbyDrivers(lat, lon, radius));
    }
}
