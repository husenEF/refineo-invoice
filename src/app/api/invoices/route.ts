import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IAddInvoice, Invoice } from "@libs/interfaces/invoice";

// Path to the invoices JSON file
const filePath = path.join(process.cwd(), "src/data/invoices.json");

// Function to read data from file
const readData = (): IAddInvoice[] => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify([]), "utf-8");
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};

// Function to write data to file
const writeData = (data: Invoice[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = searchParams.get("_end") ?? 10;
  const offset = searchParams.get("current") ?? 0;

  const invoices = readData();

  const paginatedInvoices = invoices.slice(Number(offset), Number(offset) + Number(limit));

  const link = request.headers.get("host") ?? "localhost:3000";

  return NextResponse.json(paginatedInvoices, {
    headers: {
      "Content-Range": `${Number(offset)}-${Number(offset) + paginatedInvoices.length}/${invoices.length}`,
      "X-Total-Count": invoices.length.toString(),
      link: [
        `<http://${link}/api/invoices?_limit=${limit}&_start=${
          Number(offset) - Number(limit)
        }>; rel="prev"`,
        `<http://${link}/api/invoices?_limit=${limit}&_start=${
          Number(offset) + Number(limit)
        }>; rel="next"`,
      ].join(", "),
    },
  });
}

// POST: Add a new invoice
export async function POST(req: Request) {
  const invoices = readData();
  const { name, dueDate, amount, status } = await req.json();

  const newInvoice: IAddInvoice = {
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
