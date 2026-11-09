package com.butterflynomics.domain.user;

import java.util.Objects;
import java.util.UUID;

public class User {
    private final UUID id;
    // Ở đây ta cho Email là một Value Object
    // Email chứa các nghiệp vụ phức tạp dành riêng cho Email nên
    // Ở đây email là một Value Object là điều nên làm
    private final Email email;
    private PasswordHash passwordHash; // Mật khẩu phải được hash để tránh lộ mật khẩu gốc
    private boolean active;

    // Trong DDD, người ta tránh để hàm là một public constructor
    // Vì để bảo vệ được nghiệp vụ, trước khi tạo phải thông qua một số quy tắc
    // (Aggerate)
    // Giúp việc tạo Object trở nên có ngữ nghĩa hơn
    // Các hàm register hay restore là một ví dụ
    private User(UUID id, Email email, PasswordHash passwordHash, boolean active) {
        this.id = Objects.requireNonNull(id, "Id must not be null");
        this.email = Objects.requireNonNull(email, "Email must not be null");
        this.passwordHash = Objects.requireNonNull(passwordHash, "passwordHash must not be null");
        this.active = active;
    }

    // Static Factory Method
    // Sử dụng để tạo một user
    public static User register(Email email, PasswordHash passwordHash) {
        return new User(UUID.randomUUID(), email, passwordHash, true);
    }

    // Chuyển dữ liệu từ một Value Object thành Entity
    public static User restore(UUID id, Email email, PasswordHash passwordHash, boolean active) {
        return new User(id, email, passwordHash, active);
    }

    public UUID getId() {
        return id;
    }

    public Email getEmail() {
        return email;
    }

    public PasswordHash getPasswordHash() {
        return passwordHash;
    }

    public void changePassword(PasswordHash newPasswordHash) {
        this.passwordHash = Objects.requireNonNull(newPasswordHash, "passwordHash must not be null");
    }

    public boolean canLogin() {
        return active;
    }

    public void deactivate() {
        this.active = false;
    }

    @Override
    public boolean equals(Object o) {
        return this == o || (o instanceof User other && id.equals(other.id));
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public String toString() {
        return "User[id=" + id + ", email=" + email.value() + ", active=" + active + "]";
    }
}
