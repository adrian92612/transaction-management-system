package com.transaction.system.service;

import com.transaction.system.enums.TransactionStatus;
import com.transaction.system.exception.TransactionReadException;
import com.transaction.system.exception.TransactionWriteException;
import com.transaction.system.model.CreateTransactionRequest;
import com.transaction.system.model.Transaction;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.io.Reader;
import java.io.Writer;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class TransactionService {

    private final static Path CSV_FILE_PATH = Paths.get("data/transactions.csv");

    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = new ArrayList<>();

        try (
                Reader reader = Files.newBufferedReader(CSV_FILE_PATH);
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

    public Transaction createTransaction(CreateTransactionRequest transactionRequest) {
        Transaction transaction = new Transaction(
            transactionRequest.date(),
            formatAccountNumber(transactionRequest.accountNumber().trim()),
            transactionRequest.accountHolderName().trim(),
            transactionRequest.amount(),
            generateRandomStatus()
        );

        ensureTrailingNewline();

        try (
            Writer writer = Files.newBufferedWriter(CSV_FILE_PATH, StandardOpenOption.APPEND);
            CSVPrinter printer = new CSVPrinter(writer, CSVFormat.DEFAULT)
        ) {
            printer.printRecord(
                transaction.date(),
                transaction.accountNumber(),
                transaction.accountHolderName(),
                transaction.amount(),
                transaction.status().getDisplayName()
            );
        } catch (IOException e) {
            throw new TransactionWriteException("Failed to write transaction to CSV file.", e);
        }

        return transaction;
    }

    private void ensureTrailingNewline() {
        try (RandomAccessFile file = new RandomAccessFile(CSV_FILE_PATH.toFile(), "rw")) {

            if (file.length() == 0) {
                return;
            }

            file.seek(file.length() - 1);

            int lastByte = file.read();

            if (lastByte != '\n' && lastByte != '\r') {
                file.seek(file.length());
                file.writeBytes(System.lineSeparator());
            }

        } catch (IOException e) {
            throw new TransactionWriteException(
                    "Failed to prepare CSV file for writing.",
                    e
            );
        }
    }

    private TransactionStatus generateRandomStatus() {
        TransactionStatus[] statuses = TransactionStatus.values();
        return statuses[ThreadLocalRandom.current().nextInt(statuses.length)];
    }

    private String formatAccountNumber(String accountNumber) {
        return accountNumber.replaceFirst(
                "(\\d{4})(\\d{4})(\\d{4})",
                "$1-$2-$3"
        );
    }
}
