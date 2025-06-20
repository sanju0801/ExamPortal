package com.examportal.Controller;
import com.examportal.Repositories.UserRepository;
import com.examportal.Entities.*;
import com.examportal.Services.EmailService;
import com.examportal.Util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {

    Random random = new Random();

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest request) throws Exception {
        try {
            if(!userRepository.existsByUsername(request.getUsername())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User doesn't exist in database");
            }
            this.authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (Exception e) {
            throw new Exception("Bad credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if(userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User already in use");
        }

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody String email) {
        if(!userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        int otp = 100000 + random.nextInt(900000);
        emailService.sendEmail(email, "OTP", otp);
        return ResponseEntity.ok(Map.of("OTP", otp));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> data) {
        User user = userRepository.getUserByEmail(data.get("email"));
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (!passwordEncoder.matches(data.get("oldPassword"), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(data.get("newPassword")));
        userRepository.save(user);
        return ResponseEntity.ok("Password changed successfully");

    }
}
