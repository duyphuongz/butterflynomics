package com.butterflynomics.application.auth.register;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.application.auth.EmailAlreadyUsedException;
import com.butterflynomics.application.auth.InvalidCredentialsException;
import com.butterflynomics.application.auth.PasswordHasher;
import com.butterflynomics.application.auth.TokenIssuer;
import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.Password;
import com.butterflynomics.domain.user.User;

public class RegisterService implements RegisterUseCase {
    private final UserRepository repo;
    private final PasswordHasher hasher;
    private final TokenIssuer tokenIssuer;

    public RegisterService(UserRepository repo, PasswordHasher hasher, TokenIssuer tokenIssuer) {
        this.repo = repo;
        this.hasher = hasher;
        this.tokenIssuer = tokenIssuer;
    }

    @Override
    public AccessToken register(RegisterCommand command) {
        Email email;
        try {
            email = new Email(command.email());
        } catch (Exception e) {
            throw new InvalidCredentialsException();
        }

        if (repo.findByEmail(email).isPresent()) {
            throw new EmailAlreadyUsedException();
        }

        Password rawPassword;
        try {
            rawPassword = new Password(command.password());
        } catch (Exception e) {
            throw new InvalidCredentialsException();
        }

        User newUser = User.register(email, new Password(hasher.hash(rawPassword.value())));
        repo.save(newUser);

        return tokenIssuer.issue(newUser);
    }
}
