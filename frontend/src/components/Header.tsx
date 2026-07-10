import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TransactionForm from "./TransactionForm";
import { useTransactionContext } from "@/context/TransactionContext";

export default function Header() {
  const { creating } = useTransactionContext();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Transactions
          </h1>
        </div>

        <Dialog>
          <DialogTrigger
            render={
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Transaction
              </Button>
            }
          />
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Enter the transaction details below. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <TransactionForm />
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant="outline" disabled={creating}>
                    Cancel
                  </Button>
                }
              />
              <Button type="submit" form="transaction-form" disabled={creating}>
                {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {creating ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
