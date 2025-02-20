"use client";

import { Suspense } from "react";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";
import "./app.css";

export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="home-page">
        <NavigateToResource />
      </Authenticated>
    </Suspense>
  );
}
