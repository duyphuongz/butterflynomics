package com.butterflynomics.api.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank(message = "Email must be not be blank") @Email(message = "Email is not valid") String email,
        @NotBlank(message = "Password must not be blank") String password,
        @NotBlank(message = "Confirm Password must not be blank") String confirmPassword) {

}
