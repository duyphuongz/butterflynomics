package com.butterflynomics.application.auth.exceptions;

public class InvalidRegisterException extends RuntimeException {
    public InvalidRegisterException(String message, Throwable cause) {
        super(message, cause);
    }
}
