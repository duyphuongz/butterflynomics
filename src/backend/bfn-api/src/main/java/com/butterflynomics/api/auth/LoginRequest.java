package com.butterflynomics.api.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank(message = "Please, enter your email") @Email(message = "Email is not valid") String email,
        @NotBlank(message = "Please, enter your password") @Size(max = 72, message = "Password is too long") String password) {
}
