package com.nicolecohen.vouched.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    //would normally never be hardcoded - ok for scope of dissertation
    private static final String SECRET =
            "vouchedSuperSecretKeyForJwtSigningMustBe256BitsLong!!";

    private static final long EXPIRY_MS = 86400000; // 24 hours until token expires

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    //JWT builder
    public String generateToken(String email, String role){
        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRY_MS))
                .signWith(key)
                .compact();
    }

    //JWT reversed -- locate email
    public String extractEmail(String token){
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    //simple wrapper to ensure validity of token
    public boolean isTokenValid(String token){
        try{
            extractEmail(token);
            return true;
        } catch (JwtException e){
            return false;
        }
    }

    //need to extract role from token
    public String extractRole(String token){
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role", String.class);
    }

}
