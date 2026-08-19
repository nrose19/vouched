package com.nicolecohen.vouched.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private UUID id;
    private String token;
    private String displayName;
    private String email;
}
