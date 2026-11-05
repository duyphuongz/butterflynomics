package com.butterflynomics.application.auth.register;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.domain.user.User;

public interface RegisterUseCase {
    AccessToken register(RegisterCommand user);
}
