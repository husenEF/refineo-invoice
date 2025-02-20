"use client";

import { useDelete, HttpError } from "@refinedev/core";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Chip, Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import PageTitle from "@components/layouts/page-title";
import { useDataGrid } from "@refinedev/mui";
import { Invoice } from "@interfaces/invoice";
import { Nullable } from "@interfaces/nullable";
import { useMemo, useState } from "react";
import CustomDataGrid from "@components/custom-data-grid";

export default function InvoiceList() {
  const { mutate: deleteInvoice } = useDelete();
  const [next, setNext] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    deleteInvoice({ resource: "invoices", id });
  };

  const {
    dataGridProps,
    filters,
    search,
    tableQuery: { isLoading, data },
  } = useDataGrid<Invoice, HttpError, Nullable<Invoice>>({
    initialPageSize: 10,
    metaData: {
      cursor: {
        next,
      },
    },
  });

  const columns = useMemo<GridColDef<Invoice>[]>(() => {
    return [
      { field: "name", headerName: "Invoice Name", flex: 1 },
      { field: "number", headerName: "Invoice Number", flex: 1 },
      { field: "dueDate", headerName: "Due Date", flex: 1 },
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
      { field: "amount", headerName: "Amount (Rp)", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        renderCell: ({ row }) => (
          <>
            <IconButton onClick={() => alert("Edit invoice")}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.id?.toString())} color="error">
              <Delete />
            </IconButton>
          </>
        ),
      },
    ];
  }, [handleDelete]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <PageTitle title="List Invoice" />
      <Box sx={{ bgcolor: "background.paper", p: 2 }}>
        <CustomDataGrid
          {...dataGridProps}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.id}
          autoPageSize
          pagination
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </Box>
    </Box>
  );
}
