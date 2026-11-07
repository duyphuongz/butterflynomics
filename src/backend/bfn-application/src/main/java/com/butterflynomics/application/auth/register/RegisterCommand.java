package com.butterflynomics.application.auth.register;

import com.butterflynomics.domain.user.Email;

public record RegisterCommand(String email, String password, String confirmPassword) {
    @Override
    public String toString() {
        return "RegisterCommand:[email: " + email + "]";
    }
}
