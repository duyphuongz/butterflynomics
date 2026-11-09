package com.butterflynomics.application.auth.changepassword;

import com.butterflynomics.application.auth.PasswordHasher;
import com.butterflynomics.application.auth.exceptions.UserNotFoundException;
import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.ConfirmPasswordNotMatchedException;
import com.butterflynomics.domain.user.InvalidDomainValueException;
import com.butterflynomics.domain.user.InvalidPasswordException;
import com.butterflynomics.domain.user.OldPasswordNotMatched;
import com.butterflynomics.domain.user.PasswordHash;
import com.butterflynomics.domain.user.RawPassword;
import com.butterflynomics.domain.user.User;
import com.butterflynomics.domain.user.UserDeactiveException;

public class ChangePasswordService implements ChangePasswordUseCase {
    private UserRepository userRepository;
    private PasswordHasher hasher;

    public ChangePasswordService(UserRepository userRepository, PasswordHasher passwordHasher) {
        this.userRepository = userRepository;
        this.hasher = passwordHasher;
    }

    @Override
    public void changePassword(ChangePasswordCommand command) {
        RawPassword newPassword = new RawPassword(command.newPassword());

        RawPassword confirmNewPassword = new RawPassword(command.confirmNewPassword());
        if (!newPassword.equals(confirmNewPassword)) {
            throw new ConfirmPasswordNotMatchedException();
        }

        User user = userRepository.findById(command.userId()).orElseThrow(() -> new UserNotFoundException());

        if (!user.canLogin()) {
            throw new UserDeactiveException();
        }

        boolean isMatched = hasher.matches(command.oldPassword(), user.getPasswordHash().value());

        if (!isMatched) {
            throw new OldPasswordNotMatched();
        }

        PasswordHash newHashPassword = new PasswordHash(hasher.hash(newPassword.value()));
        user.changePassword(newHashPassword);

        userRepository.save(user);
    }
}
