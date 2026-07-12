import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  message: string;
  onRetry: () => void;
};

export default function TransactionError({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
      <div className="bg-red-50 p-3 rounded-full">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg text-gray-900">
          Something went wrong
        </h3>
        <p className="text-sm text-gray-500 max-w-sm">{message}</p>
      </div>
      <Button variant="outline" onClick={onRetry} className="gap-2">
        <RefreshCcw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
