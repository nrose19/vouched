package com.nicolecohen.vouched.controller;

import com.nicolecohen.vouched.dto.FriendshipResponse;
import com.nicolecohen.vouched.security.CurrentUserService;
import com.nicolecohen.vouched.service.FriendshipService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/friendships")
public class FriendshipController {

    private final FriendshipService friendshipService;
    private final CurrentUserService currentUserService;

    public FriendshipController(FriendshipService friendshipService, CurrentUserService currentUserService){
        this.friendshipService = friendshipService;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/request/{addresseeId}")
    public ResponseEntity<FriendshipResponse> sendRequest(@PathVariable UUID addresseeId){
        UUID currentUserId = currentUserService.getCurrentUserId();
        FriendshipResponse response = friendshipService.sendRequest(currentUserId, addresseeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{friendshipId}/accept")
    public ResponseEntity<FriendshipResponse> acceptRequest(@PathVariable UUID friendshipId){
        UUID currentUserId = currentUserService.getCurrentUserId();
        FriendshipResponse response = friendshipService.acceptRequest(friendshipId, currentUserId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{friendshipId}/decline")
    public ResponseEntity<Void> declineRequest(@PathVariable UUID friendshipId){
        UUID currentUserId = currentUserService.getCurrentUserId();
        friendshipService.declineRequest(friendshipId, currentUserId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<FriendshipResponse>> getMyFriends(){
        UUID currentUserId = currentUserService.getCurrentUserId();
        return ResponseEntity.ok(friendshipService.getMyFriends(currentUserId));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<FriendshipResponse>> getPendingRequests(){
        UUID currentUserId = currentUserService.getCurrentUserId();
        return ResponseEntity.ok(friendshipService.getPendingRequests(currentUserId));
    }

    @DeleteMapping("/{friendshipId}")
    public ResponseEntity<Void> removeFriend(@PathVariable UUID friendshipId){
        UUID currentUserId = currentUserService.getCurrentUserId();
        friendshipService.removeFriend(friendshipId, currentUserId);
        return ResponseEntity.noContent().build();
    }

}
