import React from "react";
import BaseLayout from "@components/layouts/base";

export default async function Layout({ children }: React.PropsWithChildren) {
  return <BaseLayout>{children}</BaseLayout>;
}
