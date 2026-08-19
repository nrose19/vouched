package com.nicolecohen.vouched.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Getter
public class UserSearchResponse {
    private UUID id;
    private String displayName;
    private Long spotCount;
}
