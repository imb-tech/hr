import { ToastProvider } from "@heroui/toast";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <ToastProvider toastOffset={20} />
    </React.Fragment>
  );
}
