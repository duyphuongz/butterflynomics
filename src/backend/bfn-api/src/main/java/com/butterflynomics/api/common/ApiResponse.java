package com.butterflynomics.api.common;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

public record ApiResponse<T>(boolean success, int statusCode, T data, ApiError error) {

    public static <T> ResponseEntity<ApiResponse<T>> of(HttpStatusCode status, T data) {
        return ResponseEntity.status(status)
                .body(new ApiResponse<>(status.is2xxSuccessful(), status.value(), data, null));
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return of(HttpStatus.OK, data);
    }

    public static ApiResponse<Void> errorBody(HttpStatusCode status, ApiError error) {
        return new ApiResponse<>(false, status.value(), null, error);
    }

    public static ResponseEntity<ApiResponse<Void>> error(HttpStatusCode status, ApiError error) {
        return ResponseEntity.status(status).body(errorBody(status, error));
    }

    public static ResponseEntity<ApiResponse<Void>> error(ErrorCode code, String message, List<FieldIssue> details) {
        return error(code.status(), new ApiError(code.name(), message, details));
    }
}