import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const invoices = await prisma.invoice.findMany();
  return NextResponse.json(invoices);
}

export async function POST(req: Request) {
  const body = await req.json();
  const dueDate = new Date(body.dueDate);
  const amount = parseFloat(body.amount);
  const newInvoice = await prisma.invoice.create({ data: { ...body, dueDate, amount } });
  return NextResponse.json(newInvoice, { status: 201 });
}
