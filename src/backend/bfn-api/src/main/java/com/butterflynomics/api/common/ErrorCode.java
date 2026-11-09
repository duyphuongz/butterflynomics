package com.butterflynomics.api.common;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    // 400
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST),
    PASSWORD_CONFIRMATION_MISMATCH(HttpStatus.BAD_REQUEST),
    CURRENT_PASSWORD_INCORRECT(HttpStatus.BAD_REQUEST),

    // 401
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED),

    // 403
    ACCOUNT_DISABLED(HttpStatus.FORBIDDEN),

    // 404
    USER_NOT_FOUND(HttpStatus.NOT_FOUND),

    // 409
    EMAIL_ALREADY_USED(HttpStatus.CONFLICT),

    // 500
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR);

    private final HttpStatus status;

    ErrorCode(HttpStatus status) {
        this.status = status;
    }

    public HttpStatus status() {
        return status;
    }
}