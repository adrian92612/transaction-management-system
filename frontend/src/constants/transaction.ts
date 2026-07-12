import type { Transaction, SortKey } from "@/types/transaction";

const STATUS_ORDER: Record<Transaction["status"], number> = {
  Pending: 1,
  Settled: 2,
  Failed: 3,
};

export const SORT_COMPARATORS: Record<
  SortKey,
  (a: Transaction, b: Transaction) => number
> = {
  default: () => 0,
  date: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  amount: (a, b) => a.amount - b.amount,
  accountHolderName: (a, b) =>
    a.accountHolderName.localeCompare(b.accountHolderName),
  accountNumber: (a, b) => a.accountNumber.localeCompare(b.accountNumber),
  status: (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
};

export const SORT_OPTIONS: {
  label: string;
  value: SortKey;
}[] = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Account Number",
    value: "accountNumber",
  },
  {
    label: "Account Name",
    value: "accountHolderName",
  },
  {
    label: "Amount",
    value: "amount",
  },
  {
    label: "Status",
    value: "status",
  },
];

export const SORT_DIRECTION_OPTIONS = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
] as const;
