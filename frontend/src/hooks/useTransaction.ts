import { useEffect, useState } from "react";
import type {
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
  ): Promise<boolean> => {
    setError(null);
    setCreating(true);

    try {
      const transaction = await createTransaction(request);

      setTransactions((prev) => [...prev, transaction]);

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );

      return false;
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
