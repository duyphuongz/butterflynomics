package com.butterflynomics.infrastructure.persistence;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserJpaEntity {
    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private boolean active;

    protected UserJpaEntity() {

    }

    public UUID getId() {
        return this.id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public boolean isActive() {
        return this.active;
    }

}
