package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.enums.Category;
import com.nicolecohen.vouched.enums.PrivacyLevel;
import com.nicolecohen.vouched.exception.*;
import com.nicolecohen.vouched.model.Spot;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class SpotService {

    //Map key(UUID) value(Spot) pair - instantaneous spot
    private final Map<UUID, Spot> spots = new HashMap<>();

    //constructor
    public SpotService() {
        //hard coding some spots - for testing purposes
        Spot spot1 = Spot.builder()
                .id(UUID.randomUUID())
                .ownerId("user-001")
                .name("Amulet")
                .address("5 Partick, Glasgow")
                .city("Glasgow")
                .notes("Amazing coffee, cool skater vibes. Better for takeaway, limited seating.")
                .category(Category.CAFE)
                .privacyLevel(PrivacyLevel.FRIENDS)
                .vibeTags(List.of("specialty coffee"))
                .isVisited(false)
                .wantsToVisit(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Spot spot2 = Spot.builder()
                .id(UUID.randomUUID())
                .ownerId('user-002')
                .name("Cottiers")
                .address("31 Hyndland Road, Glasgow")
                .city("Glasgow")
                .notes("Pub in old Kirk, cosy vibes, good outdoor seating.")
                .category(Category.PUB)
                .privacyLevel(PrivacyLevel.FRIENDS)
                .vibeTags(List.of("beer garden", "cool atmosphere", "big groups"))
                .isVisited(true)
                .wantsToVisit(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        //adds new entry to the Map
        spots.put(spot1.getId(), spot1);
        spots.put(spot2.getId(), spot2);
    }

    public List<Spot> getAllSpots(){
        return new ArrayList<>(spots.values());
    }

    public Spot getSpot(UUID id){
        Spot spot = spots.get(id);
        if(spot == null){
            throw new NotFoundException("Spot not found with this id: " + id);
        }
        return spot;
    }

    public  Spot createSpot(Spot spot){
        if (spots.containsKey(spot.getId())){
            throw new AlreadyExistsException("A spot with this id already exists.");
        }
        spots.put(spot.getId(), spot);
        return spot;
    }

    //UPDATE SPOT
    public Spot updateSpot(UUID id, Spot updatedSpot){

        if(!spots.containsKey(updatedSpot.getId())){
            throw new NotFoundException("Spot not found with this id: " + id);
        }

        Spot existingSpot = spots.get(id);



    }

    //DELETE SPOT
    public void deleteSpot(UUID id){
        if(!spots.containsKey(id)){
            throw new NotFoundException("Cannot find spot with this id: "+ id);
        }
        spots.remove(id);
    }

}
