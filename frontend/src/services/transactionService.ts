import type { ApiResponse } from "../types/api";
import type {
  CreateTransactionRequest,
  Transaction,
} from "../types/transaction";

const API_URL = "http://localhost:8080/api/v1";

export async function fetchTransactions(): Promise<ApiResponse<Transaction[]>> {
  const response = await fetch(API_URL + "/transactions");
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error fetching transactions");
  }

  return result;
}

export async function createTransaction(
  transaction: CreateTransactionRequest,
): Promise<ApiResponse<Transaction>> {
  const response = await fetch(API_URL + "/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error creating transaction");
  }

  return result;
}
