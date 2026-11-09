package com.butterflynomics.domain.user;

public class InvalidDomainValueException extends RuntimeException {
    public InvalidDomainValueException(String message, Throwable cause) {
        super(message, cause);
    }
}
