package com.example.BillGeneration.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String body, String topic) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("stlformiddleware@gmail.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(topic);
        simpleMailMessage.setText(body);
        mailSender.send(simpleMailMessage);

        System.out.println("Email Sent");
    }
}
