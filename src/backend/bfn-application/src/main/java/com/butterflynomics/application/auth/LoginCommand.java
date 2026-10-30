package com.butterflynomics.application.auth;

public record LoginCommand(String email, String password) {
    public String toString() {
        return "LoginCommand[email=" + email + "]";
    }
}
