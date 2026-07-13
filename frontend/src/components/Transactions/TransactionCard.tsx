import type { Transaction } from "@/types/transaction";
import { formatCurrency } from "#lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { STATUS_VARIANTS } from "@/constants/transaction";

type Props = {
  t: Transaction;
};

export default function TransactionCard({ t }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col">
        <span className="font-bold text-gray-900">{t.accountHolderName}</span>
        <span className="text-xs text-gray-500 font-mono tabular-nums">
          {t.accountNumber}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1 ml-auto shrink-0">
        <div className="grid grid-cols-[100px_100px_80px] items-center gap-4">
          {/* Date Column */}
          <span className="text-sm text-gray-500 text-right tabular-nums">
            {t.date}
          </span>

          <div className="flex justify-end">
            <Popover>
              <PopoverTrigger
                className="tabular-nums text-sm font-semibold text-right truncate overflow-hidden hover:cursor-pointer font-mono"
                nativeButton={false}
                render={<span>${formatCurrency(t.amount)}</span>}
              />
              <PopoverContent>
                <p className="tabular-nums font-mono">
                  ${formatCurrency(t.amount)}
                </p>
              </PopoverContent>
            </Popover>
          </div>

          {/* Status Column */}
          <div className="flex justify-end">
            <Badge variant={STATUS_VARIANTS[t.status]}>{t.status}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
