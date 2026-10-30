package com.butterflynomics.domain.user;

import java.util.Objects;
import java.util.UUID;

public class User {
    private final UUID id;
    private final Email email;
    private final String passwordHash;
    private boolean active;

    private User(UUID id, Email email, String passwordHash, boolean active) {
        this.id = Objects.requireNonNull(id, "Id must not be null");
        this.email = Objects.requireNonNull(email, "Email must not be null");
        this.passwordHash = Objects.requireNonNull(passwordHash, "passwordHash must not be null");
        this.active = active;
    }

    public static User restore(UUID id, Email email, String passwordHash, boolean active) {
        return new User(id, email, passwordHash, active);
    }

    public UUID getId() {
        return id;
    }

    public Email getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
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
