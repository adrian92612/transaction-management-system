package com.transaction.system.exception;

public class TransactionWriteException extends RuntimeException {
    public TransactionWriteException(String message, Throwable cause) {
        super(message, cause);
    }
}
