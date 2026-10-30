package com.butterflynomics.infrastructure.persistence;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.User;

@Component
public class UserRepositoryAdapter implements UserRepository {
    private final SpringDataUserRepository jpa;

    UserRepositoryAdapter(SpringDataUserRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        return jpa.findByEmail(email.value()).map(this::toDomain);
    }

    private User toDomain(UserJpaEntity entity) {
        return User.restore(entity.getId(), new Email(entity.getEmail()), entity.getPasswordHash(), entity.isActive());
    }
}
