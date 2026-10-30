package com.butterflynomics.application.auth;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {
        super("Email or Password is invalid");
    }
}
