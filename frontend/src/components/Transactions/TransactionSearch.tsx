import { type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  searchQuery: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TransactionSearch({
  searchQuery,
  handleSearch,
}: Props) {
  return (
    <Input
      type="text"
      placeholder="Search by name, account, status, or amount..."
      value={searchQuery}
      onChange={handleSearch}
    />
  );
}
