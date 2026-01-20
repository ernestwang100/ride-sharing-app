package com.ridesharing.driver.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DriverLocationService {

    private final RedisTemplate<String, String> redisTemplate;
    private static final String DRIVER_GEO_KEY = "DRIVER_LOCATIONS";

    public void updateLocation(Long driverId, Double latitude, Double longitude) {
        Point point = new Point(longitude, latitude);
        redisTemplate.opsForGeo().add(DRIVER_GEO_KEY, point, String.valueOf(driverId));
    }

    public void removeDriver(Long driverId) {
        redisTemplate.opsForZSet().remove(DRIVER_GEO_KEY, String.valueOf(driverId));
    }
}
