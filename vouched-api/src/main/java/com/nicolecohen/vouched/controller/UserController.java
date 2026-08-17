package com.nicolecohen.vouched.controller;

import com.nicolecohen.vouched.dto.UserSearchResponse;
import com.nicolecohen.vouched.exception.NotFoundException;
import com.nicolecohen.vouched.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserSearchResponse>> search(@RequestParam String query){
        return ResponseEntity.ok(userService.searchUsers(query));
    }

}
