package com.newbyte.digital_twin.controller;

import com.newbyte.digital_twin.model.Reading;
import com.newbyte.digital_twin.service.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/readings")
public class ReadingController {

    @Autowired
    private ReadingService readingService;

    @PostMapping
    public ResponseEntity<Reading> saveReading(@RequestBody Reading reading) {
        Reading savedReading = readingService.saveReading(reading);
        return new ResponseEntity<>(savedReading, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Reading>> getAllReadings() {
        List<Reading> readings = readingService.getAllReadings();
        return new ResponseEntity<>(readings, HttpStatus.OK);
    }

    @GetMapping("/{sensorId}")
    public ResponseEntity<List<Reading>> getReadingsBySensorId(@PathVariable Long sensorId) {
        List<Reading> readings = readingService.getReadingsBySensorId(sensorId);
        return new ResponseEntity<>(readings, HttpStatus.OK);
    }
}