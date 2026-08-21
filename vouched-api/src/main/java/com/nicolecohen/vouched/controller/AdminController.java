package com.nicolecohen.vouched.controller;

import com.nicolecohen.vouched.dto.AdminUserResponse;
import com.nicolecohen.vouched.exception.NotFoundException;
import com.nicolecohen.vouched.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nicolecohen.vouched.dto.GeocodeBackfillResponse;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    //need to call getAllUsers and return response entity
    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    //deactivate
    @PatchMapping("/users/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable UUID id){
            adminService.deactivateUser(id);
            return ResponseEntity.noContent().build();
    }

    //reactivate - updating user record, not replacing whole resource
    @PatchMapping("/users/{id}/reactivate")
    public ResponseEntity<Void> reactivateUser(@PathVariable UUID id){
            adminService.reactivateUser(id);
            return ResponseEntity.noContent().build();
    }

//    updating the spots added prior to leaflet/open map integration -- need to update their lat/lon
    @PostMapping("/spots/geocode-missing")
    public ResponseEntity<GeocodeBackfillResponse> geocodeMissingSpots() {
        return ResponseEntity.ok(adminService.geocodeMissingSpots());
    }
}
