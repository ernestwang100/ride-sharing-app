package com.ridesharing.match.service;

import com.ridesharing.match.dto.NearbyDriverDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchService {

        private final RedisTemplate<String, String> redisTemplate;
        private static final String DRIVER_GEO_KEY = "DRIVER_LOCATIONS";

        public List<NearbyDriverDTO> findNearbyDrivers(Double lat, Double lon, Double radius) {
                Point point = new Point(lon, lat);
                Distance distance = new Distance(radius, Metrics.KILOMETERS);

                Circle circle = new Circle(point, distance);
                GeoResults<RedisGeoCommands.GeoLocation<String>> results = redisTemplate.opsForGeo().radius(
                                DRIVER_GEO_KEY, circle,
                                RedisGeoCommands.GeoRadiusCommandArgs.newGeoRadiusArgs().includeDistance());

                return results.getContent().stream()
                                .map(res -> new NearbyDriverDTO(
                                                res.getContent().getName(),
                                                res.getDistance().getValue()))
                                .collect(Collectors.toList());
        }
}
