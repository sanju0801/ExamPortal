package com.examportal.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, int otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("vaishnavsanju0002@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(String.valueOf(otp));
        mailSender.send(message);
    }
}