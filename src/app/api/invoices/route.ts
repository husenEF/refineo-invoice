import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {Invoice} from "@interfaces/invoice";

// Path to the invoices JSON file
const filePath = path.join(process.cwd(), "src/data/invoices.json");

// Function to read data from file
const readData = (): Invoice[] => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
};

// Function to write data to file
const writeData = (data: Invoice[]) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// GET all invoices
export async function GET() {
    const invoices = readData();
    return NextResponse.json(invoices);
}

// POST: Add a new invoice
export async function POST(req: Request) {
    const invoices = readData();
    const { name, dueDate, amount, status } = await req.json();

    const newInvoice: Invoice = {
        id: invoices.length + 1,
        name,
        number: `INV00${invoices.length + 1}`, // Auto-generate invoice number
        dueDate,
        amount,
        status,
    };

    invoices.push(newInvoice);
    writeData(invoices);

    return NextResponse.json(newInvoice, { status: 201 });
}

// DELETE an invoice
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    let invoices = readData();
    invoices = invoices.filter((invoice) => invoice.id !== id);
    writeData(invoices);

    return NextResponse.json({ message: "Invoice deleted" });
}
