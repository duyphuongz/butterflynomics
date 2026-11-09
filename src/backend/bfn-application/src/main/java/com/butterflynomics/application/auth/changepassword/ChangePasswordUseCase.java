package com.butterflynomics.application.auth.changepassword;

import com.butterflynomics.application.auth.AccessToken;

public interface ChangePasswordUseCase {
    void changePassword(ChangePasswordCommand command);
}
