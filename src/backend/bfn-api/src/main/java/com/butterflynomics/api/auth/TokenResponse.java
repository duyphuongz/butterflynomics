package com.butterflynomics.api.auth;

public record TokenResponse(String accessToken, String tokenType, long expiresIn) {

}
