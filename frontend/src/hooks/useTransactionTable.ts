import { useState, type ChangeEvent } from "react";
import { formatCurrency } from "#lib/utils";
import { SORT_COMPARATORS } from "@/constants/transaction";
import type { Transaction, SortConfig } from "@/types/transaction";

const DEFAULT_SORT_CONFIG: SortConfig = { key: "default", direction: "asc" };
const DEFAULT_ITEMS_PER_PAGE = 10;

export function useTransactionTable(transactions: Transaction[]) {
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(DEFAULT_SORT_CONFIG);

  const resetFilters = () => {
    setSearchQuery("");
    setSortConfig(DEFAULT_SORT_CONFIG);
    setItemsPerPage(DEFAULT_ITEMS_PER_PAGE);
    setCurrentPage(1);
  };

  const handleSort = (config: SortConfig) => {
    setSortConfig(config);
    setCurrentPage(1);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const query = searchQuery.trim().toLowerCase();

  const filteredTransactions = query
    ? transactions.filter((t) =>
        [
          t.accountHolderName,
          t.accountNumber,
          t.status,
          formatCurrency(t.amount),
          t.date,
        ].some((field) => field.toLowerCase().includes(query)),
      )
    : transactions;

  const { key, direction } = sortConfig;

  let sortedTransactions = filteredTransactions;

  if (key !== "default") {
    sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const result = SORT_COMPARATORS[key](a, b);
      return direction === "asc" ? result : -result;
    });
  } else if (direction === "desc") {
    sortedTransactions = [...filteredTransactions].reverse();
  }

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return {
    paginatedTransactions,
    totalPages,
    totalItems: filteredTransactions.length,
    searchQuery,
    sortConfig,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    handleSearch,
    handleSort,
    handleItemsPerPageChange,
    resetFilters,
  };
}
