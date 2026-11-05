package com.butterflynomics.application.user;

import java.util.Optional;

import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.User;

public interface UserRepository {
    Optional<User> findByEmail(Email email);

    void save(User user);
}
