package com.butterflynomics.application.auth.register;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.application.auth.PasswordHasher;
import com.butterflynomics.application.auth.TokenIssuer;
import com.butterflynomics.application.auth.exceptions.EmailAlreadyUsedException;
import com.butterflynomics.application.auth.exceptions.InvalidRegisterException;
import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.ConfirmPasswordNotMatchedException;
import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.InvalidEmailException;
import com.butterflynomics.domain.user.InvalidPasswordException;
import com.butterflynomics.domain.user.PasswordHash;
import com.butterflynomics.domain.user.RawPassword;
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
        RawPassword rawPassword = new RawPassword(command.password());
        RawPassword confirmPassword = new RawPassword(command.confirmPassword());

        if (!rawPassword.equals(confirmPassword)) {
            throw new ConfirmPasswordNotMatchedException();
        }

        Email email = new Email(command.email());

        if (repo.findByEmail(email).isPresent()) { // Một bài học: chỉ được đụng Database khi kiểm duyệt mọi data
            throw new EmailAlreadyUsedException();
        }

        User newUser = User.register(email, new PasswordHash(hasher.hash(rawPassword.value())));
        repo.save(newUser);

        return tokenIssuer.issue(newUser);
    }
}
