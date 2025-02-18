"use client";

import { useList, useDelete } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Chip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function InvoiceList() {
    const { data, isLoading } = useList({ resource: "invoices" });
    const { mutate: deleteInvoice } = useDelete();

    const handleDelete = (id: string) => {
        deleteInvoice({ resource: "invoices", id });
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Invoice Name", width: 200 },
        { field: "number", headerName: "Invoice Number", width: 150 },
        { field: "dueDate", headerName: "Due Date", width: 150 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: ({ value }) => (
                <Chip
                    label={value}
                    color={value === "Paid" ? "success" : value === "Unpaid" ? "error" : "warning"}
                />
            ),
        },
        { field: "amount", headerName: "Amount (Rp)", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: ({ row }) => (
                <>
                    <IconButton onClick={() => alert("Edit invoice")}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)} color="error">
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 500, width: "100%" }}>
            <DataGrid
                rows={data?.data || []}
                columns={columns}
                loading={isLoading}
                getRowId={(row) => row.id}
            />
        </div>
    );
}
