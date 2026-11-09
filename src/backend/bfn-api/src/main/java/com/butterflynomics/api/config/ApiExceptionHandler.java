package com.butterflynomics.api.config;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.butterflynomics.api.common.ApiError;
import com.butterflynomics.api.common.ApiResponse;
import com.butterflynomics.api.common.ErrorCode;
import com.butterflynomics.api.common.FieldIssue;
import com.butterflynomics.application.auth.exceptions.EmailAlreadyUsedException;
import com.butterflynomics.application.auth.exceptions.InvalidCredentialsException;
import com.butterflynomics.application.auth.exceptions.InvalidRegisterException;
import com.butterflynomics.application.auth.exceptions.UserNotFoundException;
import com.butterflynomics.domain.user.ConfirmPasswordNotMatchedException;
import com.butterflynomics.domain.user.InvalidDomainValueException;
import com.butterflynomics.domain.user.InvalidEmailException;
import com.butterflynomics.domain.user.InvalidPasswordException;
import com.butterflynomics.domain.user.OldPasswordNotMatched;
import com.butterflynomics.domain.user.UserDeactiveException;

@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ApiExceptionHandler.class);

    // Lỗi nghiệp vụ

    @ExceptionHandler(InvalidCredentialsException.class)
    ResponseEntity<ApiResponse<Void>> invalidCredentials(InvalidCredentialsException ex) {
        return ApiResponse.error(ErrorCode.INVALID_CREDENTIALS, ex.getMessage(), List.of());
    }

    @ExceptionHandler(EmailAlreadyUsedException.class)
    ResponseEntity<ApiResponse<Void>> emailAlreadyUsed(EmailAlreadyUsedException ex) {
        return ApiResponse.error(ErrorCode.EMAIL_ALREADY_USED, ex.getMessage(), List.of());
    }

    @ExceptionHandler(InvalidEmailException.class)
    ResponseEntity<ApiResponse<Void>> invalidEmail(InvalidEmailException ex) {
        return ApiResponse.error(ErrorCode.INVALID_EMAIL, ex.getMessage(), List.of());
    }

    @ExceptionHandler(InvalidPasswordException.class)
    ResponseEntity<ApiResponse<Void>> invalidPassword(RuntimeException ex) {
        return ApiResponse.error(ErrorCode.INVALID_PASSWORD, ex.getMessage(), List.of());
    }

    @ExceptionHandler(ConfirmPasswordNotMatchedException.class)
    ResponseEntity<ApiResponse<Void>> confirmMismatch(ConfirmPasswordNotMatchedException ex) {
        return ApiResponse.error(ErrorCode.PASSWORD_CONFIRMATION_MISMATCH, ex.getMessage(), List.of());
    }

    @ExceptionHandler(OldPasswordNotMatched.class)
    ResponseEntity<ApiResponse<Void>> currentPasswordIncorrect(OldPasswordNotMatched ex) {
        return ApiResponse.error(ErrorCode.CURRENT_PASSWORD_INCORRECT, ex.getMessage(), List.of());
    }

    @ExceptionHandler(UserDeactiveException.class)
    ResponseEntity<ApiResponse<Void>> accountDisabled(UserDeactiveException ex) {
        return ApiResponse.error(ErrorCode.ACCOUNT_DISABLED, ex.getMessage(), List.of());
    }

    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<ApiResponse<Void>> userNotFound(UserNotFoundException ex) {
        return ApiResponse.error(ErrorCode.USER_NOT_FOUND, ex.getMessage(), List.of());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<FieldIssue> details = ex.getBindingResult().getFieldErrors().stream()
                .map(f -> new FieldIssue(f.getField(), f.getDefaultMessage()))
                .toList();
        return ResponseEntity.status(status).headers(headers)
                .body(ApiResponse.errorBody(status,
                        new ApiError(ErrorCode.VALIDATION_FAILED.name(), "Invalid data", details)));
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body,
            HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        HttpStatus resolved = HttpStatus.resolve(status.value());
        String message = (resolved != null) ? resolved.getReasonPhrase() : "Request failed";
        return ResponseEntity.status(status).headers(headers)
                .body(ApiResponse.errorBody(status, ApiError.of("HTTP_" + status.value(), message)));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiResponse<Void>> unexpected(Exception ex) {
        log.error("Unexpected error", ex); // chi tiết chỉ nằm trong log
        return ApiResponse.error(ErrorCode.INTERNAL_ERROR, "Something went wrong", List.of());
    }
}