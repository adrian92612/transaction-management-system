import { APP_CONFIG } from "@/constants/appConfig";
import type { ApiResponse } from "../types/api";
import type {
  CreateTransactionRequest,
  Transaction,
} from "../types/transaction";

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${APP_CONFIG.API_BASE_URL}/transactions`);
  const result: ApiResponse<Transaction[]> = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error fetching transactions");
  }

  return result.data;
}

export async function createTransaction(
  transaction: CreateTransactionRequest,
): Promise<ApiResponse<Transaction>> {
  const response = await fetch(`${APP_CONFIG.API_BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  const result: ApiResponse<Transaction> = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error creating transaction");
  }

  return result;
}
