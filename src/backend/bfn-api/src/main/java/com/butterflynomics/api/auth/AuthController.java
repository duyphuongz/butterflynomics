package com.butterflynomics.api.auth;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.application.auth.LoginCommand;
import com.butterflynomics.application.auth.LoginUseCase;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final LoginUseCase loginUseCase;

    public AuthController(LoginUseCase loginUseCase) {
        this.loginUseCase = loginUseCase;
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest request) {
        AccessToken token = loginUseCase.login(new LoginCommand(request.email(), request.password()));
        return new TokenResponse(token.value(), "Bearer", token.expiresInSeconds());
    }
}
