package com.transaction.system.model;

import com.transaction.system.enums.TransactionStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public record Transaction(
        LocalDate date,
        String accountNumber,
        String accountHolderName,
        BigDecimal amount,
        TransactionStatus status
) {
}
