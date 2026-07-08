package com.transaction.system.enums;

import java.util.Locale;

public enum TransactionStatus {
    PENDING,
    SETTLED,
    FAILED;

    public static TransactionStatus fromString(String text) {
        try {
            return TransactionStatus.valueOf(text.toUpperCase(Locale.ROOT));
        } catch (NullPointerException | IllegalArgumentException e) {
            throw new IllegalArgumentException("Unknown transaction status: " + text, e);
        }
    }
}