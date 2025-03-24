import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster />
    </React.Fragment>
  );
}
