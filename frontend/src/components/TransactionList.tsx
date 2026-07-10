import { formatCurrency } from "#lib/utils";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTransactionContext } from "@/context/TransactionContext";

const STATUS_VARIANTS: Record<
  string,
  "default" | "outline" | "destructive" | "secondary"
> = {
  Settled: "default",
  Pending: "outline",
  Failed: "destructive",
};

export default function TransactionList() {
  const { transactions, loading, error } = useTransactionContext();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-3">
      {transactions.map((t, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">
              {t.accountHolderName}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {t.accountNumber}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm sm:gap-6 w-full sm:w-auto">
            <div className="grid grid-cols-[100px_100px_50px] items-center gap-4">
              <span className="text-sm text-gray-500 text-right">{t.date}</span>
              <Popover>
                <PopoverTrigger className="font-semibold text-right truncate overflow-hidden hover:cursor-pointer">
                  <span className="font-semiboldtext-right">
                    ${formatCurrency(t.amount)}
                  </span>
                </PopoverTrigger>
                <PopoverContent>
                  <p>${formatCurrency(t.amount)}</p>
                </PopoverContent>
              </Popover>

              <div className="flex justify-center">
                <Badge variant={STATUS_VARIANTS[t.status]}>{t.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
