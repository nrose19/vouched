package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.enums.PrivacyLevel;
import com.nicolecohen.vouched.exception.*;
import com.nicolecohen.vouched.model.Spot;
import com.nicolecohen.vouched.enums.FriendshipStatus;
import com.nicolecohen.vouched.model.Friendship;
import com.nicolecohen.vouched.model.User;
import com.nicolecohen.vouched.repository.FriendshipRepository;
import com.nicolecohen.vouched.repository.SpotRepository;
import com.nicolecohen.vouched.dto.GeocodeBackfillResponse;

import com.nicolecohen.vouched.security.CurrentUserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SpotService {

    private final SpotRepository spotRepository;
    private final CurrentUserService currentUserService;
    private final GeocodingService geocodingService;
    private final FriendshipRepository friendshipRepository;

    public SpotService(SpotRepository spotRepository, CurrentUserService currentUserService, GeocodingService geocodingService, FriendshipRepository friendshipRepository){
        this.spotRepository = spotRepository;
        this.currentUserService = currentUserService;
        this.geocodingService = geocodingService;
        this.friendshipRepository = friendshipRepository;
    }

//    [AI created 25/08/2026 to fix a security issue with visible spots]
    public List<Spot> getAllSpots() {
        User currentUser = currentUserService.getCurrentUser();
        String currentUserId = currentUser.getId().toString();

        // fetch all accepted friendships involving the current user
        List<Friendship> friendships = friendshipRepository
                .findAllFriendshipsByUserAndStatus(
                        currentUser, FriendshipStatus.ACCEPTED);

        // extract friend IDs — the friend is whichever side is not the current user
        List<String> friendIds = friendships.stream()
                .map(f -> f.getRequester().getId().equals(currentUser.getId())
                        ? f.getAddressee().getId().toString()
                        : f.getRequester().getId().toString())
                .collect(Collectors.toList());

        // if no friends yet, return only own spots — avoids empty IN clause
        if (friendIds.isEmpty()) {
            return spotRepository.findByOwnerId(currentUserId);
        }

        // return own spots + accepted friends' FRIENDS-level spots
        return spotRepository.findVisibleSpots(
                currentUserId, friendIds, PrivacyLevel.FRIENDS);
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

//    updating the spots added prior to leaflet/open map integration -- need to update their lat/lon
    public GeocodeBackfillResponse geocodeMissingSpots() {
        List<Spot> missing = spotRepository.findByLatitudeIsNull();

        int attempted = 0;
        int succeeded = 0;
        int failed = 0;
        int skipped = 0;

        for (Spot spot : missing) {
            // skip spots with no address — nothing to geocode
            if (spot.getAddress() == null || spot.getAddress().isBlank()) {
                skipped++;
                continue;
            }

            attempted++;

            double[] coords = geocodingService.geocodeAddress(spot.getAddress());

            if (coords != null) {
                spot.setLatitude(coords[0]);
                spot.setLongitude(coords[1]);
                spotRepository.save(spot);
                succeeded++;
            } else {
                failed++;
            }

            // respect Nominatim's 1 request per second limit
            try {
                Thread.sleep(1100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        return new GeocodeBackfillResponse(attempted, succeeded, failed, skipped);
    }

}
