package com.butterflynomics.api.auth;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.butterflynomics.api.common.ApiResponse;
import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.application.auth.changepassword.ChangePasswordCommand;
import com.butterflynomics.application.auth.changepassword.ChangePasswordUseCase;
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
    private final ChangePasswordUseCase changePasswordUseCase;

    public AuthController(LoginUseCase loginUseCase, RegisterUseCase registerUseCase,
            ChangePasswordUseCase changePasswordUseCase) {
        this.loginUseCase = loginUseCase;
        this.registerUseCase = registerUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginRequest request) {
        AccessToken token = loginUseCase.login(new LoginCommand(request.email(), request.password()));
        return ApiResponse.ok(new TokenResponse(token.value(), "Bearer", token.expiresInSeconds()));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<TokenResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AccessToken token = registerUseCase
                .register(new RegisterCommand(request.email(), request.password(), request.confirmPassword()));
        return ApiResponse.of(HttpStatus.CREATED, new TokenResponse(token.value(), "Bearer", token.expiresInSeconds()));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody ChangePasswordRequest request) {
        UUID userId = UUID.fromString(jwt.getSubject());
        changePasswordUseCase.changePassword(new ChangePasswordCommand(request.newPassword(),
                request.confirmNewPassword(), request.oldPassword(), userId));
        return ApiResponse.ok(null);
    }
}
