package com.butterflynomics.application.auth;

import com.butterflynomics.domain.user.User;

public interface TokenIssuer {
    AccessToken issue(User user);
}
