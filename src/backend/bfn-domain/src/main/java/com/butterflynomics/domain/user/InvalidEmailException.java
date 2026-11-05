package com.butterflynomics.domain.user;

// Một exception tạo riêng để biểu thị nghiệp vụ
public class InvalidEmailException extends RuntimeException {
    public InvalidEmailException(String message) {
        super(message);
    }
}
