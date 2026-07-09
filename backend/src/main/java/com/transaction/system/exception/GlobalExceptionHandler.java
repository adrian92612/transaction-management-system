package com.transaction.system.exception;

import com.transaction.system.model.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tools.jackson.databind.exc.InvalidFormatException;

import java.time.format.DateTimeParseException;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(TransactionReadException.class)
    public ResponseEntity<ApiResponse<Void>> handleTransactionReadException(TransactionReadException ex) {
        log.error("Failed to read transactions CSV file.", ex);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        ex.getMessage()
                ));
    }

    @ExceptionHandler({
            IllegalArgumentException.class,
            DateTimeParseException.class
    })
    public ResponseEntity<ApiResponse<Void>> handleInvalidTransactionData(Exception ex) {
        log.warn("Invalid transaction data found in CSV file: {}", ex.getMessage());

        return ResponseEntity.badRequest()
                .body(new ApiResponse<>(
                        HttpStatus.BAD_REQUEST.value(),
                        "Invalid transaction data found in CSV file."
                ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(
            MethodArgumentNotValidException ex) {

        String message = Objects
                .requireNonNull(ex.getBindingResult().getFieldError())
                .getDefaultMessage();

        log.warn("Validation failed: {}", message);

        return ResponseEntity.badRequest()
                .body(new ApiResponse<>(
                        HttpStatus.BAD_REQUEST.value(),
                        message
                ));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex) {

        log.warn("Invalid request body.", ex);

        String message = "Invalid request body.";

        Throwable cause = ex.getCause();

        if (cause instanceof InvalidFormatException ife) {

            String field = ife.getPath().getFirst().getPropertyName();

            message = switch (field) {
                case "amount" -> "Amount must be a valid number.";
                case "date" -> "Transaction date must be in YYYY-MM-DD format.";
                default -> message;
            };
        }

        return ResponseEntity.badRequest()
                .body(new ApiResponse<>(
                        HttpStatus.BAD_REQUEST.value(),
                        message
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleUnexpectedException(Exception ex) {
        log.error("Unexpected error occurred.", ex);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "An unexpected error occurred."
                ));
    }
}
