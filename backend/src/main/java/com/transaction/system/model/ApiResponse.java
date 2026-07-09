package com.transaction.system.model;

public record ApiResponse<T>(
        int status,
        String message,
        T data
) {

    public ApiResponse(int status, String message) {
        this(status, message, null);
    }
}
