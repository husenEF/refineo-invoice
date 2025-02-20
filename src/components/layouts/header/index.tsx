"use client";

import { ColorModeContext } from "@contexts/color-mode";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";

type IUser = {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true }) => {
  const { mode, setMode } = useContext(ColorModeContext);

  // const { data: user } = useGetIdentity<IUser>();
  const userDemo: IUser = {
    name: "Admin name",
    avatar: "",
    id: 1,
    isVerified: true,
  };

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <Stack direction="row" width="100%" justifyContent="flex-end" alignItems="center">
          <HamburgerMenu />
          <Stack direction="row" width="100%" justifyContent="flex-end" alignItems="center" gap={2}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                setMode();
              }}
              sx={{ backgroundColor: "background.default" }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined color="primary" />}
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ backgroundColor: "background.default" }}
            >
              <Badge badgeContent={false} color="error">
                <NotificationsOutlinedIcon color="primary" />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ backgroundColor: "background.default" }}
            >
              <Badge badgeContent={false} color="error">
                <SmsOutlinedIcon color="primary" />
              </Badge>
            </IconButton>

            {(userDemo?.avatar || userDemo?.name) && (
              <Stack direction="row" gap="16px" alignItems="center" justifyContent="center">
                {userDemo?.name && (
                  <Box>
                    <Typography
                      sx={{
                        display: {
                          xs: "none",
                          sm: "inline-block",
                        },
                      }}
                      variant="subtitle1"
                      color="primary"
                    >
                      {userDemo?.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {userDemo?.isVerified && "Verified user"}
                    </Typography>
                  </Box>
                )}
                <Avatar src={userDemo?.avatar} alt={userDemo?.name} />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
