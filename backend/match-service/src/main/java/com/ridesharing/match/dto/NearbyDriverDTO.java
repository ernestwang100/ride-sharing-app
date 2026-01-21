package com.ridesharing.match.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NearbyDriverDTO {
    private String driverId;
    private Double distance;
}
