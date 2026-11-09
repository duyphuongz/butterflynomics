package com.butterflynomics.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.butterflynomics.application.auth.PasswordHasher;
import com.butterflynomics.application.auth.TokenIssuer;
import com.butterflynomics.application.auth.changepassword.ChangePasswordService;
import com.butterflynomics.application.auth.changepassword.ChangePasswordUseCase;
import com.butterflynomics.application.auth.login.LoginService;
import com.butterflynomics.application.auth.login.LoginUseCase;
import com.butterflynomics.application.auth.register.RegisterService;
import com.butterflynomics.application.auth.register.RegisterUseCase;
import com.butterflynomics.application.user.UserRepository;

@Configuration
public class UseCaseConfig {

    @Bean
    LoginUseCase loginUseCase(UserRepository users, PasswordHasher passwordHasher, TokenIssuer issuer) {
        return new LoginService(users, passwordHasher, issuer);
    }

    @Bean
    RegisterUseCase registerUseCase(UserRepository users, PasswordHasher passwordHasher, TokenIssuer issuer) {
        return new RegisterService(users, passwordHasher, issuer);
    }

    @Bean
    ChangePasswordUseCase changePasswordUseCase(UserRepository userRepository, PasswordHasher passwordHasher) {
        return new ChangePasswordService(userRepository, passwordHasher);
    }
}
