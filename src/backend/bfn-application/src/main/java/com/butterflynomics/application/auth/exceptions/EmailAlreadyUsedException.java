package com.butterflynomics.application.auth.exceptions;

public class EmailAlreadyUsedException extends RuntimeException {
    public EmailAlreadyUsedException() {
        super("Email has been used");
    }
}
