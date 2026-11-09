package com.butterflynomics.domain.user;

public class UserDeactiveException extends RuntimeException {
    public UserDeactiveException() {
        super("User is deactive");
    }
}
