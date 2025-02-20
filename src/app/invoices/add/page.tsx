"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import PageTitle from "@components/layouts/page-title";
import { InvoiceSchema } from "@libs/interfaces/invoice";
import { Controller, FieldValue, useForm } from "react-hook-form";
import { invoiceSchema } from "@libs/schemas/invoice-schema";
import { useCreate } from "@refinedev/core";

const statusOptions = ["Paid", "Unpaid", "Pending"];

export default function AddInvoicePage() {
  const { mutate: createInvoice } = useCreate({
    resource: "invoices",
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    mode: "onSubmit",
    resolver: zodResolver(invoiceSchema),
  });

  const onSubmit = (data: FieldValue<InvoiceSchema>) => {
    data &&
      createInvoice({
        values: data,
        successNotification: (data) => {
          return {
            message: `${data?.data?.name} Successfully fetched.`,
            description: "Success with no errors",
            type: "success",
          };
        },
      });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ minHeight: 400, width: "100%" }}>
      <PageTitle title="Add Invoice" />

      <Card>
        <CardHeader
          title="Add Invoice"
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        />
        <CardContent>
          <Grid2 container spacing={3}>
            <Grid2 size={6}>
              <Box gap={1} flexDirection="column" display={"flex"}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <TextField
                        id={field.name}
                        {...field}
                        variant="outlined"
                        placeholder="Enter your invoice name"
                        fullWidth
                        sx={{
                          bgcolor: "white",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            height: "40px",
                          },
                        }}
                        error={!!errors.name}
                        helperText={errors.name?.message as string}
                      />
                    );
                  }}
                />
              </Box>
            </Grid2>
            <Grid2 size={6}>
              <Box gap={1} flexDirection="column" display={"flex"}>
                <InputLabel htmlFor="number">Invoice Number</InputLabel>
                <Controller
                  control={control}
                  name="number"
                  render={({ field }) => (
                    <TextField
                      id="number"
                      {...field}
                      variant="outlined"
                      placeholder="Enter your invoice number"
                      fullWidth
                      sx={{
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          height: "40px",
                        },
                      }}
                      error={!!errors.number}
                      helperText={errors.number?.message as string}
                    />
                  )}
                />
              </Box>
            </Grid2>
            <Grid2 size={6}>
              <Box gap={1} flexDirection="column" display={"flex"}>
                <InputLabel htmlFor="duedate">Due Date</InputLabel>
                <Controller
                  control={control}
                  name="dueDate"
                  render={({ field }) => (
                    <TextField
                      id="duedate"
                      variant="outlined"
                      placeholder="DD/MM/YYYY"
                      fullWidth
                      type="date"
                      {...field}
                      sx={{
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          height: "40px",
                        },
                      }}
                      error={!!errors.dueDate}
                      helperText={errors.dueDate?.message as string}
                    />
                  )}
                />
              </Box>
            </Grid2>
            <Grid2 size={6}>
              <Box gap={1} flexDirection="column" display={"flex"}>
                <InputLabel htmlFor="amount">amount</InputLabel>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <TextField
                      id="amount"
                      variant="outlined"
                      placeholder="Enter your invoice amount"
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                        },
                      }}
                      {...field}
                      sx={{
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          height: "40px",
                          paddingLeft: 0,
                          overflow: "hidden",
                        },
                        "& .MuiInputAdornment-root": {
                          bgcolor: "#F4F4F5", // Light gray background
                          px: 2, // Padding inside
                          height: "100%", // Make it full height
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "8px 0 0 8px", // Round left side
                          fontWeight: 500,
                          color: "#4B5563", // Dark gray text
                        },
                      }}
                      error={!!errors.amount}
                      helperText={errors.amount?.message as string}
                    />
                  )}
                />
              </Box>
            </Grid2>
            <Grid2 size={6}>
              <Box gap={1} flexDirection="column" display={"flex"}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <TextField
                      select
                      id="status"
                      fullWidth
                      placeholder="Choose a status"
                      sx={{
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          height: "40px",
                          paddingLeft: 0,
                        },
                      }}
                      error={!!errors.status}
                      helperText={errors.status?.message as string}
                      {...field}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={"+"}
            sx={{ backgroundColor: "#3C50E0", minWidth: 250, padding: 1.5 }}
          >
            Add Invoice
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
