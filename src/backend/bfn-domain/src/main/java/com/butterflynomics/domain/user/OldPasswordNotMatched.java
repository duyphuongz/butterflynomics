package com.butterflynomics.domain.user;

public class OldPasswordNotMatched extends RuntimeException {
    public OldPasswordNotMatched() {
        super("Old Password is not matched");
    }
}
