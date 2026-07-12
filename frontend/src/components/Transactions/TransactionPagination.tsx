import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import { ITEMS_PER_PAGE_OPTIONS } from "@/constants/transaction";

type Props = {
  itemsPerPage: number;
  handleItemsPerPageChange: (value: number) => void;
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
};

export default function TransactionPagination({
  itemsPerPage,
  handleItemsPerPageChange,
  totalPages,
  currentPage,
  setCurrentPage,
  totalItems,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
        <span className="text-sm text-gray-500 font-medium">
          Total: <span className="text-gray-900">{totalItems}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(val) => handleItemsPerPageChange(Number(val))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <span className="text-sm text-gray-600 min-w-20 text-center">
          {totalPages > 0
            ? `Page ${currentPage} of ${totalPages}`
            : "No results"}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
