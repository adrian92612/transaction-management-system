package com.transaction.system.controller;

import com.transaction.system.model.ApiResponse;
import com.transaction.system.model.CreateTransactionRequest;
import com.transaction.system.model.Transaction;
import com.transaction.system.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/v1")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactions() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Success",
                    transactionService.getAllTransactions()
                ));
    }

    @PostMapping("/transactions")
    public ResponseEntity<ApiResponse<Transaction>> createTransaction(
            @Valid  @RequestBody CreateTransactionRequest transaction
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        HttpStatus.CREATED.value(),
                        "Transaction successfully created",
                        transactionService.createTransaction(transaction)
                ));
    }
}
