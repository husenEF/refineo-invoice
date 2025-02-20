import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z.string().regex(/^INV\d+$/, "Invoice number must start with 'INV' followed by digits"),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(`${date}T00:00:00.000Z`)), {
    message: "Invalid date format. Use ISO-8601 DateTime, e.g. '2022-01-01T00:00:00.000Z'",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a number greater than zero",
  }),
  status: z.enum(["Paid", "Unpaid", "Pending"], {
    errorMap: () => ({ message: "Status must be Paid, Unpaid, or Pending" }),
  }),
});
