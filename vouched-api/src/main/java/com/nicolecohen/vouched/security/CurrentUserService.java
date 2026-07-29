package com.nicolecohen.vouched.security;

import com.nicolecohen.vouched.exception.NotFoundException;
import com.nicolecohen.vouched.model.User;
import com.nicolecohen.vouched.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CurrentUserService {

    private final UserRepository userRepository;

    public CurrentUserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User getCurrentUser(){
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new NotFoundException("Authenticated user not found"));
    }

    public UUID getCurrentUserId() {
        return getCurrentUser().getId();
    }

}
