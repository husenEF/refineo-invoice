import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { PostAdd, FormatListBulleted } from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import LogoIcon from "@components/icons/logo-icon";
import { ThemedTitleV2 } from "@refinedev/mui";

const drawerWidth = 240;

export const CustomSidebar = () => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Toolbar>
        <LogoIcon />
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            width: "100%",
          }}
          weight={700}
        >
          InvoiceHub
        </Typography>
      </Toolbar>
      <List>
        <ListItem component={Link} href="/invoices/list" passHref>
          <ListItemIcon>
            <FormatListBulleted sx={{ color: theme.palette.primary.contrastText }} />
          </ListItemIcon>
          <ListItemText
            primary="My Invoices"
            sx={{ color: theme.palette.primary.contrastText, fontFamily: "Open Sans" }}
          />
        </ListItem>

        <ListItem component={Link} href="/invoices/add" passHref>
          <ListItemIcon>
            <PostAdd sx={{ color: theme.palette.primary.contrastText }} />
          </ListItemIcon>
          <ListItemText primary="Add Invoice" sx={{ color: theme.palette.primary.contrastText }} />
        </ListItem>
      </List>
    </Drawer>
  );
};
