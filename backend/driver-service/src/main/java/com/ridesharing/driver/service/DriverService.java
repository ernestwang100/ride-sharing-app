package com.ridesharing.driver.service;

import com.ridesharing.driver.model.Driver;
import com.ridesharing.driver.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository repository;
    private final DriverLocationService locationService;

    public Driver getDriver(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));
    }

    @Transactional
    public Driver updateStatus(Long id, Driver.Status status) {
        Driver driver = getDriver(id);
        driver.setStatus(status);
        if (status == Driver.Status.OFFLINE) {
            locationService.removeDriver(id);
        }
        return repository.save(driver);
    }

    @Transactional
    public void updateLocation(Long id, Double lat, Double lon) {
        Driver driver = getDriver(id);
        if (driver.getStatus() == Driver.Status.OFFLINE) {
            throw new RuntimeException("Cannot update location for offline driver");
        }
        locationService.updateLocation(id, lat, lon);
    }
}
