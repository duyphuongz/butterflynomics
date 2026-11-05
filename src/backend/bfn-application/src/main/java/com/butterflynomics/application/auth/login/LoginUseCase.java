package com.butterflynomics.application.auth.login;

import com.butterflynomics.application.auth.AccessToken;

// Login nhận vào một Command 
// Trả về một access token
// Use case ta viêt bằng ngôn ngữ thuần với bỏ framework
public interface LoginUseCase {
    AccessToken login(LoginCommand command);
}
