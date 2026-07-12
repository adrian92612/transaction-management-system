import z from "zod";

export const transactionSchema = z.object({
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
