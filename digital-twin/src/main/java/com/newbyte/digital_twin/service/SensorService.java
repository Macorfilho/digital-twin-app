package com.newbyte.digital_twin.service;

import com.newbyte.digital_twin.model.Sensor;
import com.newbyte.digital_twin.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public Optional<Sensor> getSensorById(Long id) {
        return sensorRepository.findById(id);
    }

    public Sensor createSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public Optional<Sensor> updateSensor(Long id, Sensor updatedSensor) {
        return sensorRepository.findById(id)
                .map(sensor -> {
                    sensor.setName(updatedSensor.getName());
                    sensor.setUnit(updatedSensor.getUnit());
                    sensor.setCurrentValue(updatedSensor.getCurrentValue());
                    sensor.setStatus(updatedSensor.getStatus());
                    return sensorRepository.save(sensor);
                });
    }

    public void deleteSensor(Long id) {
        sensorRepository.deleteById(id);
    }
}