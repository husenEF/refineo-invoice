"use client";

import { useForm } from "@refinedev/react-hook-form";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const statusOptions = ["Paid", "Unpaid", "Pending"];

export default function AddInvoicePage() {
    const { handleSubmit, register } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const res = await fetch("/api/invoices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            router.push("/invoices/list");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography variant="h5" mb={2}>Add Invoice</Typography>

            <TextField label="Invoice Name" fullWidth {...register("name")} required sx={{ mb: 2 }} />
            <TextField label="Due Date" type="date" fullWidth {...register("dueDate")} required sx={{ mb: 2 }} />
            <TextField label="Amount" type="number" fullWidth {...register("amount")} required sx={{ mb: 2 }} />

            <TextField select label="Status" fullWidth {...register("status")} required sx={{ mb: 2 }}>
                {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </TextField>

            <Button type="submit" variant="contained">Add Invoice</Button>
        </Box>
    );
}
