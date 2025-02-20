"use client";

import { useDelete, HttpError } from "@refinedev/core";
import { GridColDef } from "@mui/x-data-grid";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  IconButton,
  Chip,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import PageTitle from "@components/layouts/page-title";
import { useDataGrid } from "@refinedev/mui";
import { Invoice } from "@interfaces/invoice";
import { Nullable } from "@interfaces/nullable";
import { useMemo, useState } from "react";
import CustomDataGrid from "@components/custom-data-grid";
import { formatDate, formatMoney } from "@helpers/string";

const statuses = ["All Status", "Paid", "Unpaid", "Pending"];

export default function InvoiceList() {
  const { mutate: deleteInvoice } = useDelete();
  const [next, setNext] = useState<string | undefined>(undefined);
  const [searchData, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

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

        renderCell: ({ value }) => (
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
    <Box sx={{ height: 400, width: "100%" }}>
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
