package com.restapi.user.service;

import com.restapi.user.model.User;
import com.restapi.user.payload.request.ReqUserLogin;
import com.restapi.user.payload.request.ReqUserRegister;
import com.restapi.user.payload.response.ResMessage;
import com.restapi.user.payload.response.ResPayload;
import com.restapi.user.payload.response.ResType;
import com.restapi.user.payload.response.objects.UserDetails;
import com.restapi.user.payload.response.objects.UserToken;
import com.restapi.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public ResponseEntity<?> register(ReqUserRegister reqUserRegister) {
        // Check username already exists or not
        if (userRepository.existsByUsername(reqUserRegister.getUsername()))
            return ResponseEntity.ok(new ResMessage("Username already exists", ResType.BAD));

        // Check email already exists or not
        if (userRepository.existsByEmail(reqUserRegister.getEmail()))
            return ResponseEntity.ok(new ResMessage("Email already exists", ResType.BAD));

        User user = new User(
                reqUserRegister.getUsername(),
                reqUserRegister.getFirstName(),
                reqUserRegister.getLastName(),
                reqUserRegister.getPhone(),
                reqUserRegister.getAddress(),
                reqUserRegister.getEmail(),
                encoder.encode(reqUserRegister.getPassword())
        );

        userRepository.save(user);

        return ResponseEntity.ok(new ResMessage("Account created successfully", ResType.OK));
    }

    public ResponseEntity<?> login(ReqUserLogin reqUserLogin){
        // Check email already exists or not
        if (!userRepository.existsByEmail(reqUserLogin.getEmail()))
            return ResponseEntity.ok(new ResMessage("Email not exists", ResType.BAD));

        User user = userRepository.findByEmail(reqUserLogin.getEmail());

        if(!encoder.matches(reqUserLogin.getPassword(), user.getPassword()))
            return ResponseEntity.ok(new ResMessage("Incorrect password", ResType.BAD));

        UserToken userToken = new UserToken(user.getId(), user.getUsername());

        return ResponseEntity.ok(new ResPayload(userToken, "Login successful", ResType.OK));
    }
}
