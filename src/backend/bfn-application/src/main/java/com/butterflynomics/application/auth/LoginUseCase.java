package com.butterflynomics.application.auth;

public interface LoginUseCase {
    AccessToken login(LoginCommand command);
}
