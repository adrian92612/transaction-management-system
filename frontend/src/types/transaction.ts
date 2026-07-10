export type Transaction = {
  date: string;
  accountNumber: string;
  accountHolderName: string;
  amount: number;
  status: "Pending" | "Settled" | "Failed";
};

export type CreateTransactionRequest = Omit<Transaction, "status">;
