export interface Invoice {
    id: number;
    name: string;
    number: string;
    dueDate: string; // ISO Date format (YYYY-MM-DD)
    amount: number;
    status: "Paid" | "Unpaid" | "Pending";
}
