package com.butterflynomics.infrastructure.securtity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.butterflynomics.application.auth.PasswordHasher;

@Component
public class BcryptPasswordHasher implements PasswordHasher {
    private final PasswordEncoder passwordEncoder;

    BcryptPasswordHasher(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean matches(String rawPassword, String passwordHash) {
        return passwordEncoder.matches(rawPassword, passwordHash);
    }

    @Override
    public String hash(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
