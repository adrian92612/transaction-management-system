import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { useTransactionContext } from "@/context/TransactionContext";
import { toast } from "sonner";
import type { TransactionFormData } from "@/types/transaction";
import { transactionSchema } from "@/schemas/transaction";

export default function TransactionForm() {
  const { addTransaction, refresh, creating } = useTransactionContext();
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: "onSubmit",
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      accountNumber: "",
      accountHolderName: "",
      amount: 0,
    },
  });

  async function onSubmit(values: TransactionFormData) {
    const result = await addTransaction(values);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    await refresh();
    form.reset();
  }

  return (
    <form id="transaction-form" onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={creating} className="space-y-4">
        <Controller
          name="date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Transaction Date</FieldLabel>
              <Input type="date" {...field} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error!]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="accountNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Account Number</FieldLabel>
              <Input
                placeholder="123456789012"
                maxLength={12}
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error!]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="accountHolderName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Account Holder Name</FieldLabel>
              <Input
                placeholder="John Doe"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error!]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Amount</FieldLabel>
              <Input
                type="number"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error!]} />
              )}
            </Field>
          )}
        />
      </fieldset>
    </form>
  );
}
