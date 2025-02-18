'use client';

import {ThemedLayoutV2} from "@refinedev/mui";
import React from "react";
import {Header} from "@components/layouts/header";
import {CustomSidebar} from "@components/layouts/custom-sidebar";

type BaseLayoutProps = {
    children: React.ReactNode
}

const BaseLayout = ({children}: BaseLayoutProps)=>{
    return <ThemedLayoutV2 Header={Header} Sider={CustomSidebar}>{children}</ThemedLayoutV2>
}

export  default  BaseLayout