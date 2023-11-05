package com.restapi.user.service;

import com.restapi.user.model.User;
import com.restapi.user.payload.request.ReqUserLogin;
import com.restapi.user.payload.request.ReqUserRegister;
import com.restapi.user.payload.response.ResMessage;
import com.restapi.user.payload.response.ResPayload;
import com.restapi.user.payload.response.ResType;
import com.restapi.user.payload.response.objects.UserToken;
import com.restapi.user.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;

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
                encoder.encode(reqUserRegister.getPassword()), null
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

    public ResponseEntity<?> getUsers () {
        return ResponseEntity.ok(userRepository.findAll());
    }
    
    public String generateResetToken() {
        return UUID.randomUUID().toString();
    }

    public void sendResetPasswordEmail(User user, String resetToken) throws MessagingException {
        JavaMailSender javaMailSender = this.javaMailSender;
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(user.getEmail());
        mimeMessageHelper.setSubject("Reset Password");
        mimeMessageHelper.setText("Click <a href=\"http://localhost:3000/reset-password?token=" + resetToken + "\">here</a> to reset your password", true);
        javaMailSender.send(mimeMessage);
    }

    public ResponseEntity<?> forgetPassword(String email) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.ok(new ResMessage("Email not found", ResType.BAD));
        }
        String resetToken = generateResetToken();
        user.setResetToken(resetToken);
        userRepository.save(user);

        sendResetPasswordEmail(user, resetToken);

        return ResponseEntity.ok(new ResMessage("Password reset email sent successfully", ResType.OK));
    }

    public ResponseEntity<?> resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token);

        if (user == null) {
            return ResponseEntity.ok(new ResMessage("Invalid reset token", ResType.BAD));
        }

        user.setPassword(encoder.encode(newPassword));
        user.setResetToken(null);
        userRepository.save(user);

        return ResponseEntity.ok(new ResMessage("Password reset successful", ResType.OK));
    }
}
