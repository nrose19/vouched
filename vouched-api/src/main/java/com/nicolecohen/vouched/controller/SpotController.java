package com.nicolecohen.vouched.controller;

import com.nicolecohen.vouched.exception.AlreadyExistsException;
import com.nicolecohen.vouched.exception.NotFoundException;
import com.nicolecohen.vouched.model.Spot;
import com.nicolecohen.vouched.service.SpotService;

import org.springframework.security.core.Authentication;
import org.aspectj.weaver.ast.Not;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/spots")
public class SpotController {

    private final SpotService spotService;

    public SpotController(SpotService spotService){
        this.spotService = spotService;
    }
    @GetMapping
    public ResponseEntity<List<Spot>> getAllSpots(){
        return ResponseEntity.ok(spotService.getAllSpots());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Spot> getSpot(@PathVariable UUID id){
        try {
            return ResponseEntity.ok(spotService.getSpot(id));
        } catch(NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Spot> createSpot(@RequestBody Spot spot) {
        Spot created = spotService.createSpot(spot);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Spot> updateSpot(@PathVariable UUID id, @RequestBody Spot spot){
        try{
            return ResponseEntity.ok(spotService.updateSpot(id, spot));
        } catch (NotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpot(@PathVariable UUID id){
        try {
            spotService.deleteSpot(id);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }
}
