package com.nicolecohen.vouched.repository;

import com.nicolecohen.vouched.model.Spot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpotRepository extends JpaRepository<Spot, UUID> {

    List<Spot> findByCity(String city);

    List<Spot> findByOwner(String ownerId);

    List<Spot> findByCityAndCategory(String city, String category);
}
