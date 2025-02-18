import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Typography } from "@mui/material";
import { Dashboard, Receipt } from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

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
                <Typography variant="h6" sx={{ color: "white", textAlign: "center", width: "100%" }}>
                    InvoiceHub
                </Typography>
            </Toolbar>
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />

            <List >
                    <ListItem component={Link} href="/invoices/list" passHref>
                        <ListItemIcon>
                            <Dashboard sx={{ color: theme.palette.text.primary }} />
                        </ListItemIcon>
                        <ListItemText primary="My Invoices" />
                    </ListItem>

                    <ListItem component={Link} href="/invoices/add" passHref>
                        <ListItemIcon>
                            <Receipt sx={{ color: theme.palette.text.primary }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Invoice" />
                    </ListItem>
            </List>
        </Drawer>
    );
};
