package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.dto.FriendshipResponse;
import com.nicolecohen.vouched.model.Friendship;
import com.nicolecohen.vouched.model.User;
import com.nicolecohen.vouched.enums.FriendshipStatus;
import com.nicolecohen.vouched.exception.*;
import com.nicolecohen.vouched.repository.FriendshipRepository;
import com.nicolecohen.vouched.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public FriendshipService(FriendshipRepository friendshipRepository,
                             UserRepository userRepository){
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    public FriendshipResponse sendRequest(UUID requesterId, UUID addresseeId){
        if (requesterId.equals(addresseeId)){
            throw new IllegalArgumentException("You cannot send a friend request to yourself.");
        }

        User requester = findUserById(requesterId);
        User addressee = findUserById(addresseeId);

        friendshipRepository.findBetweenUsers(requester, addressee)
                .ifPresent(existing ->{
                    throw new AlreadyExistsException("A friendship or request already exists between these users");
                });

        Friendship friendship = Friendship.builder()
                .requester(requester)
                .addressee(addressee)
                .status(FriendshipStatus.PENDING)
                .build();

        friendshipRepository.save(friendship);
        return toResponse(friendship,requesterId);
    }

    public FriendshipResponse acceptRequest(UUID friendshipId, UUID currentUserId){
        Friendship friendship = findFriendshipById(friendshipId);

        if(!friendship.getAddressee().getId().equals(currentUserId)){
            throw new IllegalArgumentException("Only the recipient can accept a friend request.");
        }
        if(friendship.getStatus() != FriendshipStatus.PENDING){
            throw new IllegalArgumentException("This request has already been responded to.");
        }

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendship.setRespondedAt(LocalDateTime.now());
        friendshipRepository.save(friendship);
        return toResponse(friendship, currentUserId);
    }

    public void declineRequest(UUID friendshipId, UUID currentUserId){
        Friendship friendship = findFriendshipById(friendshipId);

        if(!friendship.getAddressee().getId().equals(currentUserId)){
            throw new IllegalArgumentException("Only the recipient can decline a friend request.");
        }

        friendship.setStatus(FriendshipStatus.DECLINED);
        friendship.setRespondedAt(LocalDateTime.now());
        friendshipRepository.save(friendship);
    }

    //List out friends that status is ACCEPTED
    public List<FriendshipResponse> getMyFriends(UUID currentUserId){
        User user = findUserById(currentUserId);
        return friendshipRepository
                .findAllFriendshipsByUserAndStatus(user, FriendshipStatus.ACCEPTED)
                .stream()
                .map(f -> toResponse(f, currentUserId))
                .collect(Collectors.toList());
    }

    //find list of PENDING requests
    public List<FriendshipResponse> getPendingRequests(UUID currentUserId){
        User user = findUserById(currentUserId);
        return friendshipRepository
                .findAllFriendshipsByUserAndStatus(user, FriendshipStatus.PENDING)
                .stream()
                .map(f -> toResponse(f, currentUserId))
                .collect(Collectors.toList());
    }

    //remove friend
    public void removeFriend(UUID friendshipId, UUID currentUserId){
        Friendship friendship = findFriendshipById(friendshipId);

        boolean isFriend = friendship.getRequester().getId().equals(currentUserId)
                || friendship.getAddressee().getId().equals(currentUserId);

        if (!isFriend){
            throw new IllegalArgumentException("You are not currently friends.");
        }

        friendshipRepository.deleteById(friendshipId);
    }

    public boolean areFriends(UUID userAId, UUID userBId){
        User userA = findUserById(userAId);
        User userB = findUserById(userBId);
        return friendshipRepository
                .findBetweenUsers(userA, userB)
                .map(f -> f.getStatus() == FriendshipStatus.ACCEPTED)
                .orElse(false);
    }

    private FriendshipResponse toResponse(Friendship f, UUID currentUserId){

        boolean youSentRequest =
                f.getRequester().getId().equals(currentUserId);

        User friend = youSentRequest
                ? f.getAddressee()
                : f.getRequester();

        return new FriendshipResponse(
                f.getId(),
                friend.getId(),
                friend.getDisplayName(),
                friend.getEmail(),
                f.getStatus(),
                youSentRequest,
                f.getCreatedAt(),
                f.getRespondedAt()
        );
    }

    private User findUserById(UUID id){
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("User not found: " + id));
    }

    private Friendship findFriendshipById(UUID id){
        return friendshipRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Friendship not found: " + id));
    }
}

