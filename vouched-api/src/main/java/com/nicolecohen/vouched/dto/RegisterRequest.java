package com.nicolecohen.vouched.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String displayName;
}
