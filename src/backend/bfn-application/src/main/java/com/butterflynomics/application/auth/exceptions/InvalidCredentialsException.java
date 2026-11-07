package com.butterflynomics.application.auth.exceptions;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {
        super("Email or Password is invalid");
    }
}
