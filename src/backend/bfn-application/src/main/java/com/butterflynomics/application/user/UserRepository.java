package com.butterflynomics.application.user;

import java.util.Optional;
import java.util.UUID;

import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.User;

public interface UserRepository {
    Optional<User> findById(UUID id);

    Optional<User> findByEmail(Email email);

    void save(User user);
}
