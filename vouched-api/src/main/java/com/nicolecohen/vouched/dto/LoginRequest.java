package com.nicolecohen.vouched.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}