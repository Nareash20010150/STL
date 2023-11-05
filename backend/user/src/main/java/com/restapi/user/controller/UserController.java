package com.restapi.user.controller;

import com.restapi.user.payload.request.ReqUserLogin;
import com.restapi.user.payload.request.ReqUserRegister;
import com.restapi.user.payload.response.ResMessage;
import com.restapi.user.service.UserService;

import javax.mail.MessagingException;

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
    public ResponseEntity<ResMessage> register( @RequestBody ReqUserRegister reqUserRegister) {
        System.out.println ("Registering user: " + reqUserRegister.getUsername() );
        return (ResponseEntity<ResMessage>) userService.register(reqUserRegister);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ReqUserLogin reqUserLogin) {
        return userService.login(reqUserLogin);
    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestParam String email) throws MessagingException {
        return userService.forgetPassword(email);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        System.out.println("new password" + newPassword);
        return userService.resetPassword(token, newPassword);
    }
}
