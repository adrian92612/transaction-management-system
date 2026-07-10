import { createContext, useContext, type ReactNode } from "react";
import { useTransaction } from "#hooks/useTransaction";

type TransactionContextType = ReturnType<typeof useTransaction>;

const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const transaction = useTransaction();

  return (
    <TransactionContext.Provider value={transaction}>
      {children}
    </TransactionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTransactionContext() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactionContext must be used within TransactionProvider",
    );
  }

  return context;
}
