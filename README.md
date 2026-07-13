# Transaction Management System

A full-stack transaction management application that allows users to view and add transactions.

The system consists of:

- A **Spring Boot REST API** for transaction data operations
- A **React + Vite frontend** for displaying and creating transactions
- **CSV file storage** for transaction persistence

---

# Tech Stack

## Backend

- Java 21
- Spring Boot
- Maven
- CSV file storage

## Frontend

- React
- TypeScript
- Vite
- pnpm

## Development Tools

- Node.js
- Maven Wrapper
- Concurrently

---

# Project Structure

```
transaction-management-system
│
├── backend
│   ├── data
│   │   └── transactions.csv
│   ├── src
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.ts
│
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

# Prerequisites

Before running the application, ensure the following software is installed.

## Java

Required version:

```
Java 21+
```

Verify installation:

```bash
java -version
```

Example output:

```
openjdk version "21.x.x"
```

---

## Node.js

Required version:

```
Node.js 20+
```

Verify installation:

```bash
node -version
```

---

## pnpm

Install pnpm globally:

```bash
npm install -g pnpm
```

Verify installation:

```bash
pnpm -version
```

---

# Installation

## 1. Clone the repository

```bash
git clone <repository-url>

cd transaction-management-system
```

---

## 2. Install root dependencies

The root project manages commands for running both frontend and backend.

```bash
pnpm install
```

---

## 3. Install frontend dependencies

```bash
cd frontend

pnpm install

cd ..
```

---

# Running the Application

The application can be started from the project root.

## Run Frontend and Backend Together

```bash
pnpm dev
```

This starts:

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:8080
```

---

## Run Frontend Only

```bash
pnpm frontend
```

The frontend will be available at:

```
http://localhost:3000
```

---

## Run Backend Only

```bash
pnpm backend
```

The backend API will be available at:

```
http://localhost:8080
```

---

# API Documentation

Base URL:

```
http://localhost:8080/api
```

---

# API Response Format

All API responses follow a consistent wrapper format:

```json
{
  "status": 200,
  "message": "Operation completed successfully",
  "data": {}
}
```

---

# GET /transactions

Retrieves all transactions from the CSV file.

## Request

```http
GET /transactions
```

## Response Example

```json
{
  "status": 200,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "transactionDate": "2025-03-01",
      "accountNumber": "7289-3445-1121",
      "accountHolderName": "Maria Johnson",
      "amount": 150.0,
      "status": "Settled"
    }
  ]
}
```

---

# POST /transactions

Creates a new transaction.

The backend automatically assigns a random transaction status:

- Pending
- Settled
- Failed

## Request

```http
POST /transactions
```

## Request Body

```json
{
  "transactionDate": "2025-03-15",
  "accountNumber": "1234-5678-9012",
  "accountHolderName": "John Doe",
  "amount": 250.5
}
```

## Response Example

```json
{
  "status": 201,
  "message": "Transaction created successfully",
  "data": {
    "transactionDate": "2025-03-15",
    "accountNumber": "1234-5678-9012",
    "accountHolderName": "John Doe",
    "amount": 250.5,
    "status": "Pending"
  }
}
```

---

# Data Storage

Transactions are stored in a CSV file:

```
backend/data/transactions.csv
```

CSV format:

```
Transaction Date,Account Number,Account Holder Name,Amount,Status
```

Example:

```
2025-03-01,7289-3445-1121,Maria Johnson,150.00,Settled
```

---

# Frontend Features

The frontend provides a responsive transaction management interface with:

## Transaction List

Transactions are displayed as individual cards containing:

- Account Holder Name
- Account Number
- Transaction Date
- Amount
- Transaction Status

Each transaction card displays a status badge with the corresponding color:

| Status  | Color   |
| ------- | ------- |
| Pending | Outline |
| Settled | Black   |
| Failed  | Red     |

---

## Transaction Search

Users can search transactions using:

- Account holder name
- Account number
- Status
- Amount

The transaction list updates dynamically based on the search query.

---

## Transaction Sorting

Users can sort transactions by different criteria:

- Default order
- Available transaction fields

Sorting direction can be changed:

- Ascending
- Descending

---

## Pagination

The transaction list supports pagination to efficiently navigate through transaction records.

---

## Add Transaction

Users can create a new transaction through an add transaction modal containing:

- Transaction Date
- Account Number
- Account Holder Name
- Amount

After submission:

1. The frontend sends the transaction data to the backend API.
2. The backend assigns a random status:
   - Pending
   - Settled
   - Failed
3. The newly created transaction is displayed in the transaction list.

---

# User Experience

Additional UI features include:

- Loading states during API requests
- Error handling for failed requests
- Reset functionality for search and sorting filters
- Responsive card-based transaction layout

---

# Error Handling

## Backend

The API handles:

- Invalid requests
- CSV read/write failures
- Unexpected server errors

## Frontend

The UI handles:

- API failures
- Loading states
- Form submission errors

---

# AI Usage

AI tools were used during development as an engineering assistant for:

- Reviewing implementation approaches
- Troubleshooting development environment issues
- Improving documentation structure
- Reviewing potential code improvements

All final implementation decisions, architecture choices, and code integration were manually reviewed and completed.

---

# Author

Developed as part of a full-stack engineering take-home assignment.
