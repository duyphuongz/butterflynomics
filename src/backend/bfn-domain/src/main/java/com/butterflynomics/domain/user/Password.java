package com.butterflynomics.domain.user;

public record Password(String value) {
    public Password {
        if (value.isBlank()) {
            throw new InvalidPasswordException("Password must be not blank");
        }
    }
}
