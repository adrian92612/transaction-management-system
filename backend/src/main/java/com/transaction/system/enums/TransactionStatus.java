package com.transaction.system.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TransactionStatus {
    PENDING("Pending"),
    SETTLED("Settled"),
    FAILED("Failed");

    private final String displayName;

    TransactionStatus(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    public static TransactionStatus fromString(String text) {
        for (TransactionStatus status : values()) {
            if (status.displayName.equalsIgnoreCase(text)
                    || status.name().equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + text);
    }
}