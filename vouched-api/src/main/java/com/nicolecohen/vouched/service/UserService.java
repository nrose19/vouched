package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.dto.*;
import com.nicolecohen.vouched.enums.Role;
import com.nicolecohen.vouched.exception.*;
import com.nicolecohen.vouched.model.User;
import com.nicolecohen.vouched.repository.UserRepository;
import com.nicolecohen.vouched.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request){
        if (userRepository.existsByEmail(request.getEmail())){
            throw new AlreadyExistsException("An account with this email already exists.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getDisplayName())
                .role(Role.USER)
                .isActive(true)
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getDisplayName(), user.getEmail());
    }

    public AuthResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())){
            throw new NotFoundException("Invalid email or password");
        }
        if(!user.isActive()){
            throw new NotFoundException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getDisplayName(),user.getEmail());
    }

    public List<UserSearchResponse> searchUsers(String query){
        return userRepository.searchUser(query)
                .stream()
                .map(user -> new UserSearchResponse(
                        user.getId(),
                        user.getDisplayName()
                ))
                .collect(Collectors.toList());
    }
}
