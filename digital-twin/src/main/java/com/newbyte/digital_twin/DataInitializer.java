package com.newbyte.digital_twin;

import com.newbyte.digital_twin.model.Reading;
import com.newbyte.digital_twin.model.Sensor;
import com.newbyte.digital_twin.repository.ReadingRepository;
import com.newbyte.digital_twin.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private ReadingRepository readingRepository;

    @Override
    public void run(String... args) throws Exception {
        // Limpa todos os dados existentes
        readingRepository.deleteAll();
        sensorRepository.deleteAll();

        // Cria os sensores desejados
        Sensor pressaoSensor1 = new Sensor("Pressão 1", "hPa", 1012.5, "OK");
        Sensor pressaoSensor2 = new Sensor("Pressão 2", "hPa", 1013.1, "Alerta");
        Sensor fluxoSensor1 = new Sensor("Fluxo 1", "L/min", 5.2, "OK");
        Sensor fluxoSensor2 = new Sensor("Fluxo 2", "L/min", 5.5, "OK");
        Sensor temperaturaSensor1 = new Sensor("Temperatura 1", "°C", 27.0, "OK");
        Sensor temperaturaSensor2 = new Sensor("Temperatura 2", "°C", 26.5, "Alerta");

        // Salva os sensores para obter seus IDs gerados
        pressaoSensor1 = sensorRepository.save(pressaoSensor1);
        pressaoSensor2 = sensorRepository.save(pressaoSensor2);
        fluxoSensor1 = sensorRepository.save(fluxoSensor1);
        fluxoSensor2 = sensorRepository.save(fluxoSensor2);
        temperaturaSensor1 = sensorRepository.save(temperaturaSensor1);
        temperaturaSensor2 = sensorRepository.save(temperaturaSensor2);

        // Cria leituras de exemplo para cada sensor usando os IDs gerados (Long)
        LocalDateTime now = LocalDateTime.now();

        readingRepository.saveAll(List.of(
                // Leituras de Pressão 1
                new Reading(pressaoSensor1.getId(), 1012.3, now.minusMinutes(15)),
                new Reading(pressaoSensor1.getId(), 1012.6, now.minusMinutes(10)),
                new Reading(pressaoSensor1.getId(), 1012.8, now.minusMinutes(5)),
                new Reading(pressaoSensor1.getId(), 1013.0, now),

                // Leituras de Pressão 2
                new Reading(pressaoSensor2.getId(), 1013.0, now.minusMinutes(20)),
                new Reading(pressaoSensor2.getId(), 1013.2, now.minusMinutes(10)),
                new Reading(pressaoSensor2.getId(), 1013.5, now.minusMinutes(5)),
                new Reading(pressaoSensor2.getId(), 1013.3, now),

                // Leituras de Fluxo 1
                new Reading(fluxoSensor1.getId(), 5.1, now.minusMinutes(25)),
                new Reading(fluxoSensor1.getId(), 5.2, now.minusMinutes(15)),
                new Reading(fluxoSensor1.getId(), 5.3, now.minusMinutes(5)),
                new Reading(fluxoSensor1.getId(), 5.25, now),

                // Leituras de Fluxo 2
                new Reading(fluxoSensor2.getId(), 5.4, now.minusMinutes(30)),
                new Reading(fluxoSensor2.getId(), 5.6, now.minusMinutes(20)),
                new Reading(fluxoSensor2.getId(), 5.5, now.minusMinutes(10)),
                new Reading(fluxoSensor2.getId(), 5.7, now),

                // Leituras de Temperatura 1
                new Reading(temperaturaSensor1.getId(), 26.8, now.minusMinutes(35)),
                new Reading(temperaturaSensor1.getId(), 26.9, now.minusMinutes(25)),
                new Reading(temperaturaSensor1.getId(), 27.0, now.minusMinutes(15)),
                new Reading(temperaturaSensor1.getId(), 27.2, now),

                // Leituras de Temperatura 2
                new Reading(temperaturaSensor2.getId(), 26.3, now.minusMinutes(40)),
                new Reading(temperaturaSensor2.getId(), 26.6, now.minusMinutes(30)),
                new Reading(temperaturaSensor2.getId(), 26.4, now.minusMinutes(20)),
                new Reading(temperaturaSensor2.getId(), 26.7, now)
        ));

        System.out.println("Dados mockados de sensores e leituras inseridos corretamente.");
    }
}