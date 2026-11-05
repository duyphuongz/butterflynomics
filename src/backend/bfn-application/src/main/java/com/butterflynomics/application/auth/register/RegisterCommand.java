package com.butterflynomics.application.auth.register;

import com.butterflynomics.domain.user.Email;

public record RegisterCommand(String email, String password) {
    public String ToString() {
        return "RegisterCommand:[email: " + email + "]";

    }
}
