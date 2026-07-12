import { useEffect, useState } from "react";
import type {
  AddTransactionResult,
  CreateTransactionRequest,
  Transaction,
} from "../types/transaction";
import {
  createTransaction,
  fetchTransactions,
} from "../services/transactionService";

export function useTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (
    request: CreateTransactionRequest,
  ): Promise<AddTransactionResult> => {
    setError(null);
    setCreating(true);

    try {
      const response = await createTransaction(request);

      setTransactions((prev) => [...prev, response.data]);

      return {
        success: true,
        message: response.message || "Transaction created successfully",
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";

      setError(message);
      return {
        success: false,
        message,
      };
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    creating,
    error,
    refresh: loadTransactions,
    addTransaction,
  };
}
