import { invoiceSchema } from "@libs/schemas/invoice-schema";
import { z } from "zod";

export interface Invoice {
  name: string;
  number: string;
  dueDate: string; // ISO Date format (YYYY-MM-DD)
  amount: number;
  status: "Paid" | "Unpaid" | "Pending";
}

export interface IAddInvoice extends Invoice {
  id: number;
}

export type InvoiceSchema = z.infer<typeof invoiceSchema>;
