package com.butterflynomics.infrastructure.persistence;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//Đây là nơi triển khai công nghệ 
//Trong Domain ta có User thì ở đây ta triển khai User đấy thành cái User mà ta hay viết trong Spring
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

    public UserJpaEntity(UUID id, String email, String passwordHash, boolean active) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.active = active;
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
