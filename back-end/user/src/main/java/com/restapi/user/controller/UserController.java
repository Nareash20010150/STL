package com.restapi.user.controller;

import com.restapi.user.payload.request.ReqUserLogin;
import com.restapi.user.payload.request.ReqUserRegister;
import com.restapi.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("User Service Working");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody ReqUserRegister reqUserRegister) {
        return userService.register(reqUserRegister);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ReqUserLogin reqUserLogin) {
        return userService.login(reqUserLogin);
    }
}
