import { Box, Typography } from "@mui/material";

interface PageTitleProps {
  children?: React.ReactNode;
  title: string;
}

const PageTitle = ({ title = "Invoice Hub", children }: PageTitleProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Typography variant="h5" fontWeight={"bold"}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
export default PageTitle;
