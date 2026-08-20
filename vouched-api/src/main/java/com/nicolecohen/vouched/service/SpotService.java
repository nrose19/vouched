package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.enums.Category;
import com.nicolecohen.vouched.enums.PrivacyLevel;
import com.nicolecohen.vouched.exception.*;
import com.nicolecohen.vouched.model.Spot;
import com.nicolecohen.vouched.repository.SpotRepository;

import com.nicolecohen.vouched.security.CurrentUserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class SpotService {

    private final SpotRepository spotRepository;
    private final CurrentUserService currentUserService;
    private final GeocodingService geocodingService;

    public SpotService(SpotRepository spotRepository, CurrentUserService currentUserService, GeocodingService geocodingService){
        this.spotRepository = spotRepository;
        this.currentUserService = currentUserService;
        this.geocodingService = geocodingService;
    }

    public List<Spot> getAllSpots() {
        String currentUserId = currentUserService
                .getCurrentUser()
                .getId()
                .toString();
        return spotRepository.findByOwnerIdOrPrivacyLevelIn(
                currentUserId,
                List.of(PrivacyLevel.FRIENDS, PrivacyLevel.COMMUNITY)
        );
    }

    public Spot getSpot(UUID id){
        return spotRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Spot not found with id: " + id
                ));
    }

    //CREATE SPOT
    public  Spot createSpot(Spot spot){
        String ownerId = currentUserService
                .getCurrentUser()
                .getId()
                .toString();
        spot.setOwnerId(ownerId);
        if(spot.getAddress() != null && !spot.getAddress().isBlank()){
            double[] coordinates = geocodingService
                    .geocodeAddress(spot.getAddress());
            if(coordinates != null) {
                spot.setLatitude(coordinates[0]);
                spot.setLongitude(coordinates[1]);
            }
        }
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
