package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.dto.*;
import com.nicolecohen.vouched.enums.Role;
import com.nicolecohen.vouched.exception.*;
import com.nicolecohen.vouched.model.User;
import com.nicolecohen.vouched.repository.SpotRepository;
import com.nicolecohen.vouched.repository.UserRepository;
import com.nicolecohen.vouched.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final SpotRepository spotRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, SpotRepository spotRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.spotRepository = spotRepository;
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
        return new AuthResponse(user.getId(), token, user.getDisplayName(), user.getEmail());
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
        return new AuthResponse(user.getId(), token, user.getDisplayName(),user.getEmail());
    }


    public List<UserSearchResponse> searchUsers(String query){
        //find all users matching the search term
        List<User> users = userRepository.searchUsers(query);

        //extract user's ID as string -- store spot.owner id
        List<String> ownerIds = users.stream()
                .map(u -> u.getId().toString())
                .collect(Collectors.toList());

        //one database query to count spots for ALL users at once
        //avoids N+1 problem - one query total, not per use
        List<Object[]> rawCounts = spotRepository
                .findSpotCountsByOwnerIds(ownerIds);

        //convert raw results into a map for easy lookup
        //e.g. row[0] is ownerId, row[1] is count
        Map<String, Long> countMap = rawCounts.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));

        //response
        return users.stream()
                .map(u -> new UserSearchResponse(
                        u.getId(),
                        u.getDisplayName(),
                        countMap.getOrDefault(u.getId().toString(), 0L)
                ))
                .collect(Collectors.toList());
    }
}
