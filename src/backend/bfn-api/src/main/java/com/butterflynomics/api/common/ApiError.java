package com.butterflynomics.api.common;

import java.util.List;

public record ApiError(String code, String message, List<FieldIssue> details) {

    public ApiError {
        details = (details == null) ? List.of() : List.copyOf(details); // không bao giờ null, không ai sửa được từ bên
                                                                        // ngoài
    }

    public static ApiError of(String code, String message) {
        return new ApiError(code, message, List.of());
    }
}