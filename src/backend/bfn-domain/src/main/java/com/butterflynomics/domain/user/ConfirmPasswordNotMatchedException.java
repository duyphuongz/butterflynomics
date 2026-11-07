package com.butterflynomics.domain.user;

public class ConfirmPasswordNotMatchedException extends RuntimeException {
    public ConfirmPasswordNotMatchedException() {
        super("Password and Confirm Password is not matched");
    }
}
