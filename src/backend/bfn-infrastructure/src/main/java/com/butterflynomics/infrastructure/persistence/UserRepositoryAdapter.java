package com.butterflynomics.infrastructure.persistence;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.butterflynomics.application.user.UserRepository;
import com.butterflynomics.domain.user.Email;
import com.butterflynomics.domain.user.Password;
import com.butterflynomics.domain.user.User;

//Ta sử dụng một lớp trung gian để triển khai User Repository
@Component
public class UserRepositoryAdapter implements UserRepository {
    private final SpringDataUserRepository userRepositoryJpa;

    UserRepositoryAdapter(SpringDataUserRepository userRepositoryJpa) {
        this.userRepositoryJpa = userRepositoryJpa;
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        return userRepositoryJpa.findByEmail(email.value()).map(this::toDomain);
    }

    private User toDomain(UserJpaEntity entity) {
        return User.restore(entity.getId(), new Email(entity.getEmail()), new Password(entity.getPasswordHash()),
                entity.isActive());
    }

    private UserJpaEntity toEntity(UUID id, Email email, Password passwordHash, boolean active) {
        return new UserJpaEntity(id, email.value(), passwordHash.value(), active);
    }

    @Override
    public void save(User user) {
        UserJpaEntity userJpa = toEntity(user.getId(), user.getEmail(), user.getPasswordHash(),
                user.canLogin());
        userRepositoryJpa.save(userJpa);
    }
}
