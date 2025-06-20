package com.examportal.Entities;

public class JwtResponse {
    String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token = token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
