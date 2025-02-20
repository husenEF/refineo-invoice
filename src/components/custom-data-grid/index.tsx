import { IDataGridProps } from "@interfaces/custom-data-grid";
import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => {
  return {
    border: 0,
    "& .MuiDataGrid-root": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      borderRadius: "8px",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#25314A",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #364152",
    },
    "& .MuiTablePagination-root": {
      color: "#fff",
    },
  };
});

const CustomDataGrid = ({ ...props }: IDataGridProps) => <StyledDataGrid {...props} />;

export default CustomDataGrid;
