package com.butterflynomics.domain.user;

public record Password(String value) {
    public Password {
        if (value == null || value.isBlank()) {
            throw new InvalidPasswordException("Password must be not blank");
        }
    }
}
