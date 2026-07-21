package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.enums.Category;
import com.nicolecohen.vouched.enums.PrivacyLevel;
import com.nicolecohen.vouched.exception.*;
import com.nicolecohen.vouched.model.Spot;
import com.nicolecohen.vouched.repository.SpotRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class SpotService {

    private final SpotRepository spotRepository;

    public SpotService(SpotRepository spotRepository){
        this.spotRepository = spotRepository;
    }

    public List<Spot> getAllSpots(){
        return spotRepository.findAll();
    }

    public Spot getSpot(UUID id){
        return spotRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Spot not found with id: " + id
                ));
    }

    //CREATE SPOT
    public  Spot createSpot(Spot spot){
        return spotRepository.save(spot);
    }

    //UPDATE SPOT
    public Spot updateSpot(UUID id, Spot updatedSpot){

        Spot existingSpot = getSpot(id);
        //fields that are allowed to be updated
        existingSpot.setNotes(updatedSpot.getNotes());
        existingSpot.setPrivacyLevel(updatedSpot.getPrivacyLevel());
        existingSpot.setVibeTags(updatedSpot.getVibeTags());
        existingSpot.setVisited(updatedSpot.isVisited());
        existingSpot.setWantsToVisit(updatedSpot.isWantsToVisit());
        existingSpot.setVisitedDate(updatedSpot.getVisitedDate());
        existingSpot.setUpdatedAt(LocalDateTime.now());

        return spotRepository.save(existingSpot);
    }

    //DELETE SPOT
    public void deleteSpot(UUID id){
        if(!spotRepository.existsById(id)){
            throw new NotFoundException("Cannot find spot with this id: "+ id);
        }
        spotRepository.deleteById(id);
    }

}
