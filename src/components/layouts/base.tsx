"use client";

import { ThemedLayoutV2 } from "@refinedev/mui";

import React from "react";
import { Header } from "@components/layouts/header";
import { CustomSidebar } from "@components/layouts/custom-sidebar";
import { Container } from "@mui/material";

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <ThemedLayoutV2 Header={Header} Sider={CustomSidebar} Title={() => "Husen"}>
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          minHeight: "100vh",
        }}
      >
        {children}
      </Container>
    </ThemedLayoutV2>
  );
};

export default BaseLayout;
