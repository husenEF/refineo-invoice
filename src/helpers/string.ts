import { format } from "date-fns";

export const formatMoney = (amount: number, currency: string = "IDR"): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return format(date, "MMM dd, yyyy");
};
