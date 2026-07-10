import { useEffect, useState } from "react";
import type { Transaction } from "../types/transaction";
import { fetchTransactions } from "../services/transactionService";

export function useTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTransactions();
      setTransactions(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTransactions();
  }, []);

  return { transactions, loading, error, refresh: loadTransactions };
}
