import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import {ToastProvider} from "@heroui/toast";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <ToastProvider />
    </React.Fragment>
  );
}
