package com.butterflynomics.api.auth;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.application.auth.login.LoginCommand;
import com.butterflynomics.application.auth.login.LoginUseCase;
import com.butterflynomics.application.auth.register.RegisterCommand;
import com.butterflynomics.application.auth.register.RegisterUseCase;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final LoginUseCase loginUseCase;
    private final RegisterUseCase registerUseCase;

    public AuthController(LoginUseCase loginUseCase, RegisterUseCase registerUseCase) {
        this.loginUseCase = loginUseCase;
        this.registerUseCase = registerUseCase;
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest request) {
        AccessToken token = loginUseCase.login(new LoginCommand(request.email(), request.password()));
        return new TokenResponse(token.value(), "Bearer", token.expiresInSeconds());
    }

    @PostMapping("/register")
    public TokenResponse register(@Valid @RequestBody RegisterRequest request) {
        AccessToken token = registerUseCase
                .register(new RegisterCommand(request.email(), request.password(), request.confirmPassword()));
        return new TokenResponse(token.value(), "Bearer", token.expiresInSeconds());
    }
}
