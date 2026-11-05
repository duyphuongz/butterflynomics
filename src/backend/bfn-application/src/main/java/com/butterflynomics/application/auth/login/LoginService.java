package com.butterflynomics.application.auth.login;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.application.auth.InvalidCredentialsException;
import com.butterflynomics.application.auth.PasswordHasher;
import com.butterflynomics.application.auth.TokenIssuer;
import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.InvalidEmailException;
import com.butterflynomics.domain.user.InvalidPasswordException;
import com.butterflynomics.domain.user.Password;
import com.butterflynomics.domain.user.User;

// LoginService là nơi triển khai logic nghiệp vụ của LoginUseCase
public class LoginService implements LoginUseCase {
    // final giúp compile bắt mình gán đủ, tránh bị lỗi runtime như null
    // Không bị thay đổi dependecies khi vô tình viết code lỗi
    // Nó chạy nhiều thì các luồng nó luôn thấy được đúng giá trị đấy sau chạy xong
    private final UserRepository users;
    private final PasswordHasher passwordHasher;
    private final TokenIssuer tokenIssuer;

    public LoginService(UserRepository users, PasswordHasher passwordHasher, TokenIssuer tokenIssuer) {
        this.users = users;
        this.passwordHasher = passwordHasher;
        this.tokenIssuer = tokenIssuer;
    }

    // Login
    // Đầu vào: LoginCommand
    // Đầu ra: AccessToken
    // Logic: kiểm tra password
    @Override
    public AccessToken login(LoginCommand command) {
        Email email;
        try {
            email = new Email(command.email()); // không cần triển khai kiểm tra nghiệp vụ phức tạp vì Value Object làm
                                                // việc đấy thay
        } catch (InvalidEmailException e) {
            throw new InvalidCredentialsException(); // bắt lỗi
        }

        Password validPassword;

        try {
            validPassword = new Password(command.password());
        } catch (InvalidPasswordException e) {
            throw new InvalidCredentialsException();
        }

        User user = users.findByEmail(email).orElseThrow(InvalidCredentialsException::new);

        if (!user.canLogin() || !passwordHasher.matches(validPassword.value(), user.getPasswordHash().value())) {
            throw new InvalidCredentialsException();
        }

        return tokenIssuer.issue(user);
    }
}
