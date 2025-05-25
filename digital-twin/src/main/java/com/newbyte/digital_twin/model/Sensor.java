package com.newbyte.digital_twin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String unit;
    private Double currentValue;
    private String status;

    public Sensor() {
    }

    public Sensor(String name, String unit, Double currentValue, String status) {
        this.name = name;
        this.unit = unit;
        this.currentValue = currentValue;
        this.status = status;
    }
}
