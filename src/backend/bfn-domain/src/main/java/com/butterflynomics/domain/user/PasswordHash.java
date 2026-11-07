package com.butterflynomics.domain.user;

public record PasswordHash(String value) {
    public PasswordHash {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Password hash must not be blank");
        }
    }

    @Override
    public String toString() {
        return "PasswordHash[****]";
    }
}
