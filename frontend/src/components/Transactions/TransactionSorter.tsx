import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SORT_DIRECTION_OPTIONS, SORT_OPTIONS } from "@/constants/transaction";

import type { SortConfig, SortKey } from "@/types/transaction";

type Props = {
  sortConfig: SortConfig;
  onSort: (config: SortConfig) => void;
};

export default function TransactionSorter({ sortConfig, onSort }: Props) {
  return (
    <div className="flex gap-2">
      <Select
        value={sortConfig.key}
        onValueChange={(value) => {
          if (!value) return;

          onSort({
            ...sortConfig,
            key: value as SortKey,
          });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by...">
            {
              SORT_OPTIONS.find((option) => option.value === sortConfig.key)
                ?.label
            }
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortConfig.direction}
        onValueChange={(value) => {
          if (!value) return;

          onSort({
            ...sortConfig,
            direction: value as "asc" | "desc",
          });
        }}
      >
        <SelectTrigger className="w-28">
          <SelectValue>
            {
              SORT_DIRECTION_OPTIONS.find(
                (option) => option.value === sortConfig.direction,
              )?.label
            }
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {SORT_DIRECTION_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
