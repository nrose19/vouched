package com.nicolecohen.vouched.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/spots")
public class SpotController {

    @GetMapping
    public List<String> getAllSpots(){
        return List.of("Cottiers", "Old School House", "Oran Mor");
    }

    @GetMapping("/{name}")
    public String getSpot(@PathVariable String name){
        return "Spot: " + name;
    }

    @PostMapping
    public String createSpot(@RequestBody String spotName){
        return "Created Spot: " + spotName;
    }

    @PutMapping("/{name}")
    public String updateSpot(@PathVariable String name, @RequestBody String newName){
        return "Updated " + name + " to " + newName;
    }

    @DeleteMapping("/{name}")
    public String deleteSpot(@PathVariable String name){
        return "Deleted spot: " + name;
    }
}
