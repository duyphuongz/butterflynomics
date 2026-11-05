package com.butterflynomics.application.auth;

public class EmailAlreadyUsedException extends RuntimeException {
    public EmailAlreadyUsedException() {
        super("Email has been used");
    }
}
