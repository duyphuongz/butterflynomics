package com.butterflynomics.api.auth;

import jakarta.validation.constraints.NotBlank;

public record ChangePasswordRequest(
        @NotBlank String newPassword,
        @NotBlank String confirmNewPassword,
        @NotBlank String oldPassword) {
}
