package com.transaction.system.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateTransactionRequest(

        @NotNull(message = "Transaction date is required")
        LocalDate date,

        @NotBlank(message = "Account number is required")
        String accountNumber,

        @NotBlank(message = "Account name holder is required")
        String accountHolderName,

        @NotNull(message = "Amount is required")
        @Positive(message = "Amount must be greater that zero")
        BigDecimal amount
) {
}
