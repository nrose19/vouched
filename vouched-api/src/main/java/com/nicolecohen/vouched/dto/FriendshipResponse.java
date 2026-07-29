package com.nicolecohen.vouched.dto;

import com.nicolecohen.vouched.enums.FriendshipStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class FriendshipResponse {

    private UUID friendshipId;
    private UUID friendUserId;
    private String friendDisplayName;
    private String friendEmail;
    private FriendshipStatus status;
    private boolean youSentRequest;
    private LocalDateTime createdAt;
    private LocalDateTime respondedAt;

}
