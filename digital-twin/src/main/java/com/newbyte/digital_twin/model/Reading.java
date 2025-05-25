package com.newbyte.digital_twin.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Reading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sensorId;
    @Column(name = "\"value\"")
    private Double value;
    private LocalDateTime timestamp;

    public Reading() {
    }

    public Reading(Long sensorId, Double value, LocalDateTime timestamp) {
        this.sensorId = sensorId;
        this.value = value;
        this.timestamp = timestamp;
    }
}