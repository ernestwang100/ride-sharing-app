package com.ridesharing.trip.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long riderId;
    private Long driverId;

    private Double startLat;
    private Double startLon;
    private Double endLat;
    private Double endLon;

    @Enumerated(EnumType.STRING)
    private TripStatus status;

    private Double fare;

    private LocalDateTime createdAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;

    public enum TripStatus {
        CREATED, MATCHING, ASSIGNED, STARTED, COMPLETED, CANCELLED
    }
}
