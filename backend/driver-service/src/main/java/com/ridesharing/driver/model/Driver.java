package com.ridesharing.driver.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "drivers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String name;

    private String vehicleId;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Double rating;

    public enum Status {
        AVAILABLE, BUSY, OFFLINE
    }
}
