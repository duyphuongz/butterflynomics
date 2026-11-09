package com.butterflynomics.application.auth.changepassword;

import java.util.UUID;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.domain.user.RawPassword;

public record ChangePasswordCommand(String newPassword, String confirmNewPassword, String oldPassword,
        UUID userId) {
    @Override
    public String toString() {
        return "newPassword: ***, oldPassword: ***";
    }
}
