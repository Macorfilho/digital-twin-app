package com.newbyte.digital_twin.service;

import com.newbyte.digital_twin.model.Reading;
import com.newbyte.digital_twin.repository.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReadingService {

    @Autowired
    private ReadingRepository readingRepository;

    public Reading saveReading(Long sensorId, Double value, LocalDateTime timestamp) {
        Reading reading = new Reading(sensorId, value, timestamp);
        return readingRepository.save(reading);
    }

    public List<Reading> getAllReadings() {
        return readingRepository.findAll();
    }

    public List<Reading> getReadingsBySensorId(Long sensorId) {
        return readingRepository.findBySensorId(sensorId);
    }
}