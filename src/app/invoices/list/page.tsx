"use client";

import { useDelete, HttpError } from "@refinedev/core";
import { GridColDef } from "@mui/x-data-grid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  IconButton,
  Chip,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import PageTitle from "@components/layouts/page-title";
import { useDataGrid } from "@refinedev/mui";
import { IAddInvoice } from "@libs/interfaces/invoice";
import { Nullable } from "@libs/interfaces/nullable";
import { useCallback, useMemo, useState } from "react";
import CustomDataGrid from "@components/custom-data-grid";
import { formatDate, formatMoney } from "@helpers/string";

const statuses = ["All Status", "Paid", "Unpaid", "Pending"];

export default function InvoiceList() {
  const { mutate: deleteInvoice } = useDelete();
  const [next] = useState<string | undefined>(undefined);
  const [searchData, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const handleDelete = useCallback(
    (id: string) => {
      deleteInvoice({ resource: "invoices", id });
    },
    [deleteInvoice]
  ); // Add deleteInvoice as a dependency

  const {
    dataGridProps,
    tableQuery: { isLoading },
  } = useDataGrid<IAddInvoice, HttpError, Nullable<IAddInvoice>>({
    initialPageSize: 10,
    metaData: {
      cursor: {
        next,
      },
    },
  });

  const columns = useMemo<GridColDef<IAddInvoice>[]>(() => {
    return [
      {
        field: "name",
        headerName: "Invoice Name",
        flex: 1,
        renderCell: ({ row }) => {
          return (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>{row.name}</Typography>
              <Typography variant="caption" color="textDisabled">
                {row.number}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        flex: 1,
        renderCell: ({ value }) => formatDate(value),
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,

        /*************  ✨ Codeium Command ⭐  *************/
        /**
         * Renders a Chip component based on the status value.
         * - Paid: green
         * - Unpaid: red
         * - Pending: yellow
         */
        /******  d2b43c79-76be-4208-8dd0-783f6b525171  *******/ renderCell: ({ value }) => (
          <Chip
            variant="outlined"
            label={value}
            color={value === "Paid" ? "success" : value === "Unpaid" ? "error" : "warning"}
          />
        ),
      },
      {
        field: "amount",
        headerName: "Amount (Rp)",
        flex: 1,
        renderCell: ({ value }) => formatMoney(value),
      },
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
    <Box sx={{ minHeight: 400, width: "100%" }}>
      <PageTitle title="List Invoice">
        <Box display="flex" gap={2}>
          {/* Search Input */}
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchData}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon color="disabled" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .MuiInputBase-root": {
                height: 1,
              },
            }}
          />

          {/* Status Filter Dropdown */}
          <Select
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              minWidth: 150,
            }}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </PageTitle>
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
