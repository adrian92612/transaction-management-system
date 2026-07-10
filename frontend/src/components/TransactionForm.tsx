import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { useTransactionContext } from "@/context/TransactionContext";

const transactionSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  accountNumber: z
    .string()
    .trim()
    .length(12, "Account number must be 12 digits")
    .regex(/^\d{12}$/, "Account number must be exactly 12 digits"),
  accountHolderName: z
    .string()
    .trim()
    .min(1, "Account holder name is required"),
  amount: z
    .number({ error: "Amount must be a number" })
    .positive("Amount must be positive")
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Amount can have a maximum of 2 decimal places",
    ),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export default function TransactionForm() {
  const { addTransaction, refresh, creating } = useTransactionContext();
  const form = useForm<z.infer<typeof transactionSchema>>({
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
    const success = await addTransaction(values);
    if (success) {
      await refresh();
      form.reset();
    }
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
