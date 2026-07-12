import { Loader2 } from "lucide-react";

export default function TransactionLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 className="h-20 w-20 animate-spin text-gray-400" />
      <p className="text-sm text-gray-500 font-medium animate-pulse">
        Loading transactions...
      </p>
    </div>
  );
}
