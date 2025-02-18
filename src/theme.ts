import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1C2434", // Sidebar background color
    },
    secondary: {
      main: "#3E4C59",
    },
    background: {
      default: "#F4F6F8",
      paper: "#1C2434",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a6b0c3",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1C2434",
          color: "#ffffff",
        },
      },
    },
  },
});
