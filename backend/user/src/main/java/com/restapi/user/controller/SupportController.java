package com.restapi.user.controller;

import com.restapi.user.payload.response.objects.UserDetails;
import com.restapi.user.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class SupportController {
    @Autowired
    private SupportService supportService;

    // Support for Microservice Communication
    @GetMapping("/support")
    public UserDetails getUserDetailsById(@RequestParam(name = "userId") Integer userId) {
        return supportService.getUserDetailsById(userId);
    }
}
