package com.nicolecohen.vouched.service;

import com.nicolecohen.vouched.exception.AlreadyExistsException;
import com.nicolecohen.vouched.exception.NotFoundException;
import com.nicolecohen.vouched.model.User;
import com.nicolecohen.vouched.dto.AdminUserResponse;
import com.nicolecohen.vouched.repository.SpotRepository;
import com.nicolecohen.vouched.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class AdminService {
    private final UserRepository userRepository;
    private final SpotRepository spotRepository;

    public AdminService(UserRepository userRepository, SpotRepository spotRepository){
        this.userRepository = userRepository;
        this.spotRepository =  spotRepository;
    }
    //get all users - needs to call user repo & map each user to a admin user response
    public List<AdminUserResponse> getAllUsers(){
        return userRepository.findAll().stream()
                .map(user -> new AdminUserResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getDisplayName(),
                        user.isActive(),
                        user.getCreatedAt(),
                        spotRepository.findByOwnerId(
                                user.getId().toString()).size()
                        )
                )
                .toList();
    }

    //deactivate users
    public void deactivateUser(UUID userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new NotFoundException("invalid id"));
        if(!user.isActive()){
            throw new NotFoundException("user is already deactivated");
        }

        //set user to inactive
        user.setActive(false);
        userRepository.save(user);
    }

    //reactivate users
    public void reactivateUser(UUID userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new NotFoundException("invalid id"));
        if(user.isActive()){
            throw new AlreadyExistsException("user is already active");
        }

        user.setActive(true);
        userRepository.save(user);
    }

}
