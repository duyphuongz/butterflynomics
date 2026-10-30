package com.butterflynomics.application.auth;

import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.InvalidEmailException;
import com.butterflynomics.domain.user.User;

public class LoginService implements LoginUseCase {
    private final UserRepository users;
    private final PasswordHasher passwordHasher;
    private final TokenIssuer tokenIssuer;

    public LoginService(UserRepository users, PasswordHasher passwordHasher, TokenIssuer tokenIssuer) {
        this.users = users;
        this.passwordHasher = passwordHasher;
        this.tokenIssuer = tokenIssuer;
    }

    @Override
    public AccessToken login(LoginCommand command) {
        if (command.password() == null || command.password().isBlank()) {
            throw new InvalidCredentialsException();
        }

        Email email;
        try {
            email = new Email(command.email());
        } catch (InvalidEmailException e) {
            throw new InvalidCredentialsException();
        }

        User user = users.findByEmail(email).orElseThrow(InvalidCredentialsException::new);

        if (!user.canLogin() || !passwordHasher.matches(command.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }

        return tokenIssuer.issue(user);
    }
}
