package com.newbyte.digital_twin.repository;

import com.newbyte.digital_twin.model.Reading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingRepository extends JpaRepository<Reading, Long> {
    List<Reading> findBySensorId(Long sensorId);
}