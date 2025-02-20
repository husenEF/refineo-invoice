import { ITypography } from "@interfaces/theme";
import { createTheme } from "@mui/material/styles";
import { Passion_One, Open_Sans } from "next/font/google";
import { RefineThemes } from "@refinedev/mui";

const passionOneFont = Passion_One({
  display: "swap",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});
const openSansFont = Open_Sans({
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const baseTypography: ITypography = {
  fontFamily: [openSansFont.style.fontFamily, passionOneFont.style.fontFamily].join(","),
};

export const darkTheme: any = createTheme({
  typography: {
    fontFamily: [openSansFont.style.fontFamily, passionOneFont.style.fontFamily].join(","),
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#1C2434", // Sidebar background color
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3E4C59",
    },
    background: {
      default: "red",
      paper: "#1C2434",
    },
    text: {
      primary: "#1C2434",
      secondary: "#a6b0c3",
      disabled: "#64748B",
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

export const lightTheme: any = createTheme({
  ...RefineThemes.Blue,
  typography: baseTypography,
  palette: {
    ...RefineThemes.Blue.palette,
    primary: {
      main: "#1C2434", // Sidebar background color
      contrastText: "#ffffff",
    },
    background: {
      default: "#F1F5F9",
      paper: "#ffffff",
    },
  },
});
