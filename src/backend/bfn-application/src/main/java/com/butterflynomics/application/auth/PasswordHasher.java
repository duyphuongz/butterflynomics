package com.butterflynomics.application.auth;

public interface PasswordHasher {
    boolean matches(String rawPassword, String passwordHash);

    String hash(String rawPassword);
}
