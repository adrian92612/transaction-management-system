package com.transaction.system.exception;

public class TransactionReadException extends RuntimeException {
    public TransactionReadException(String message, Throwable cause) {
        super(message, cause);
    }
}
