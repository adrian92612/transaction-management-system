import { useTransactionContext } from "@/context/TransactionContext";
import TransactionSearch from "./TransactionSearch";
import TransactionCard from "./TransactionCard";
import TransactionPagination from "./TransactionPagination";
import TransactionSorter from "./TransactionSorter";
import { useTransactionTable } from "#hooks/useTransactionTable";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Label } from "#components/ui/label";
import TransactionError from "./TransactionError";
import TransactionLoading from "./TransactionLoading";

export default function TransactionSection() {
  const { transactions, loading, error } = useTransactionContext();

  const {
    paginatedTransactions,
    totalPages,
    totalItems,
    searchQuery,
    sortConfig,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    handleSearch,
    handleSort,
    handleItemsPerPageChange,
    resetFilters,
  } = useTransactionTable(transactions);

  if (loading) return <TransactionLoading />;

  if (error) {
    return <TransactionError message={error} onRetry={resetFilters} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-col gap-1.5 grow">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Search Transactions
          </Label>
          <TransactionSearch
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Sort & Reset
          </Label>
          <div className="flex gap-2">
            <TransactionSorter sortConfig={sortConfig} onSort={handleSort} />
            <Button
              variant="outline"
              title="Reset Filters"
              onClick={resetFilters}
              className="shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {paginatedTransactions.map((t, idx) => (
        <TransactionCard key={idx} t={t} />
      ))}

      <TransactionPagination
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
}
