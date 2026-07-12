import type { transactionSchema } from "@/schemas/transaction";
import type z from "zod";

export type Transaction = {
  date: string;
  accountNumber: string;
  accountHolderName: string;
  amount: number;
  status: "Pending" | "Settled" | "Failed";
};

export type CreateTransactionRequest = Omit<Transaction, "status">;

export type SortKey =
  | "default"
  | "date"
  | "accountNumber"
  | "accountHolderName"
  | "amount"
  | "status";

export type SortConfig = {
  key: SortKey;
  direction: "asc" | "desc";
};

export type AddTransactionResult = {
  success: boolean;
  message: string;
};

export type TransactionFormData = z.infer<typeof transactionSchema>;
