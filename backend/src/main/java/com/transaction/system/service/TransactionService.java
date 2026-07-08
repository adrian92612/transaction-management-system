package com.transaction.system.service;

import com.transaction.system.enums.TransactionStatus;
import com.transaction.system.exception.TransactionReadException;
import com.transaction.system.model.Transaction;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Reader;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    private final static String CSV_FILE_PATH = "data/transactions.csv";

    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = new ArrayList<>();
        Path path = Paths.get(CSV_FILE_PATH);

        try (
                Reader reader = Files.newBufferedReader(path);
                CSVParser parser = CSVFormat.DEFAULT.builder()
                        .setHeader()
                        .setSkipHeaderRecord(true)
                        .get()
                        .parse(reader)
        ) {

            for (CSVRecord record : parser) {
                transactions.add(new Transaction(
                        LocalDate.parse(record.get("Transaction Date")),
                        record.get("Account Number"),
                        record.get("Account Holder Name"),
                        new BigDecimal(record.get("Amount")),
                        TransactionStatus.fromString(record.get("Status"))
                ));
            }
        } catch (IOException e) {
            throw new TransactionReadException("Failed to read transactions CSV file", e);
        }

        return transactions;
    }
}
