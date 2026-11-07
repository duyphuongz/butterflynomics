package com.butterflynomics.domain.user;

public record RawPassword(String value) {
    public RawPassword {
        if (value == null || value.isBlank()) {
            throw new InvalidPasswordException("Password must be not blank");
        }
    }
}
