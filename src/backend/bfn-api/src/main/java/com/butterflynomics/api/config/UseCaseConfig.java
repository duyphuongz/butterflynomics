package com.butterflynomics.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.butterflynomics.application.auth.LoginService;
import com.butterflynomics.application.auth.LoginUseCase;
import com.butterflynomics.application.auth.PasswordHasher;
import com.butterflynomics.application.auth.TokenIssuer;
import com.butterflynomics.application.user.UserRepository;

@Configuration
public class UseCaseConfig {

    @Bean
    LoginUseCase loginUseCase(UserRepository users, PasswordHasher passwordHasher, TokenIssuer issuer) {
        return new LoginService(users, passwordHasher, issuer);
    }
}
