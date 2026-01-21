package com.ridesharing.rider.service;

import com.ridesharing.rider.model.Rider;
import com.ridesharing.rider.repository.RiderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RiderService {

    private final RiderRepository repository;

    public Rider getRider(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rider not found"));
    }

    public Rider createRider(Rider rider) {
        return repository.save(rider);
    }
}
