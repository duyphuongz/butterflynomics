package com.butterflynomics.application.auth;

public record AccessToken(String value, long expiresInSeconds) {

    @Override
    public String toString() {
        return "AccessToken[expiresInSeconds=" + expiresInSeconds + "]";
    }
}
