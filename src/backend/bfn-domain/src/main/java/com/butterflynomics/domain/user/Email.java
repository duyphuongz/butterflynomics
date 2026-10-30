package com.butterflynomics.domain.user;

import java.util.Locale;
import java.util.regex.Pattern;

public record Email(String value) {
    private static final Pattern PATTERN = Pattern.compile("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");

    public Email {
        if (value == null || value.isBlank()) {
            throw new InvalidEmailException("Email must not be blank");
        }
        value = value.trim().toLowerCase(Locale.ROOT);
        if (value.length() > 255 || !PATTERN.matcher(value).matches()) {
            throw new InvalidEmailException("Email is invalid");
        }
    }
}
