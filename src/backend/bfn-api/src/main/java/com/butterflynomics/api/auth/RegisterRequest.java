package com.butterflynomics.api.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
                @NotBlank(message = "Email must be not be blank") @Email(message = "Email is not valid") String email,
                @NotBlank(message = "Password must not be blank") @Size(max = 72, message = "Password is too long") String password,
                @NotBlank(message = "Confirm Password must not be blank") @Size(max = 72, message = "Confirm Password is too long") String confirmPassword) {

}
