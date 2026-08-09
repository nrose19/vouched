package com.nicolecohen.vouched.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Getter
public class AdminUserResponse {
    private UUID id;
    private String email;
    private String displayName;
    private boolean isActive;
    private LocalDateTime createdAt;
    private long spotCount;
    //communityCount deferred -- outside of new MVP scope
}
