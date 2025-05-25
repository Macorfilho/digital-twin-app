package com.newbyte.digital_twin.controller;

import com.newbyte.digital_twin.model.Sensor;
import com.newbyte.digital_twin.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @GetMapping
    public ResponseEntity<List<Sensor>> getAllSensors() {
        List<Sensor> sensors = sensorService.getAllSensors();
        return new ResponseEntity<>(sensors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sensor> getSensorById(@PathVariable Long id) {
        Optional<Sensor> sensor = sensorService.getSensorById(id);
        return sensor.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Sensor> createSensor(@RequestBody Sensor sensor) {
        Sensor createdSensor = sensorService.createSensor(sensor);
        return new ResponseEntity<>(createdSensor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sensor> updateSensor(@PathVariable Long id, @RequestBody Sensor updatedSensor) {
        Optional<Sensor> sensor = sensorService.updateSensor(id, updatedSensor);
        return sensor.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensor(@PathVariable Long id) {
        sensorService.deleteSensor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}