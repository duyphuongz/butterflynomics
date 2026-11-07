package com.butterflynomics.application.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.butterflynomics.application.auth.exceptions.InvalidCredentialsException;
import com.butterflynomics.application.auth.login.LoginCommand;
import com.butterflynomics.application.auth.login.LoginService;
import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.PasswordHash;
import com.butterflynomics.domain.user.RawPassword;
import com.butterflynomics.domain.user.User;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;

/**
 * Test thuần JUnit: không Spring, không DB. Dùng "đồ giả" thay cho các cổng.
 */
class LoginServiceTest {

    private static final PasswordHash HASH = new PasswordHash("hash-cua-Password123");

    // Đồ giả: "băm" chỉ là so sánh chuỗi
    // private final PasswordHasher fakeHasher = (raw, hash) ->
    // hash.equals("hash-cua-" + raw);
    private final PasswordHasher fakeHasher = new PasswordHasher() {
        @Override
        public boolean matches(String rawPassword, String passwordHash) {
            return passwordHash.equals("hash-cua-" + rawPassword);
        }

        @Override
        public String hash(String rawPassword) {
            return "hash-cua-" + rawPassword;
        }
    };
    private final TokenIssuer fakeIssuer = user -> new AccessToken("token-cua-" + user.getEmail().value(), 3600);

    private LoginService serviceWith(User... existing) {
        // UserRepository repo = email -> {
        // for (User u : existing) {
        // if (u.getEmail().equals(email)) {
        // return Optional.of(u);
        // }
        // }
        // return Optional.empty();
        // };
        UserRepository repo = new UserRepository() {
            @Override
            public Optional<User> findByEmail(Email email) {
                for (User u : existing) {
                    if (u.getEmail().equals(email)) {
                        return Optional.of(u);
                    }
                }
                return Optional.empty();
            }

            @Override
            public void save(User user) {
                throw new UnsupportedOperationException(
                        "Login Service test do not need save function");
            }
        };
        return new LoginService(repo, fakeHasher, fakeIssuer);
    }

    private User user(String email, boolean active) {
        return User.restore(UUID.randomUUID(), new Email(email), HASH, active);
    }

    @Test
    void dangNhapDungThiNhanToken() {
        LoginService service = serviceWith(user("a@b.com", true));

        AccessToken token = service.login(new LoginCommand("A@B.com", "Password123"));

        assertEquals("token-cua-a@b.com", token.value());
    }

    @Test
    void saiMatKhauThiTuChoi() {
        LoginService service = serviceWith(user("a@b.com", true));

        assertThrows(InvalidCredentialsException.class,
                () -> service.login(new LoginCommand("a@b.com", "sai-mat-khau")));
    }

    @Test
    void emailKhongTonTaiThiTuChoi() {
        LoginService service = serviceWith(user("a@b.com", true));

        assertThrows(InvalidCredentialsException.class,
                () -> service.login(new LoginCommand("khac@b.com", "Password123")));
    }

    @Test
    void taiKhoanBiKhoaThiTuChoiDuDungMatKhau() {
        LoginService service = serviceWith(user("a@b.com", false));

        assertThrows(InvalidCredentialsException.class,
                () -> service.login(new LoginCommand("a@b.com", "Password123")));
    }

    @Test
    void emailSaiDinhDangHoacMatKhauTrongThiTuChoi() {
        LoginService service = serviceWith(user("a@b.com", true));

        assertThrows(InvalidCredentialsException.class,
                () -> service.login(new LoginCommand("khong-phai-email", "Password123")));
        assertThrows(InvalidCredentialsException.class,
                () -> service.login(new LoginCommand("a@b.com", "")));
        assertThrows(InvalidCredentialsException.class,
                () -> service.login(new LoginCommand("a@b.com", null)));
    }
}