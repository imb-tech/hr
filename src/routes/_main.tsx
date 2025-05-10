import DefaultLayout from "@/layouts/default";
import { createFileRoute, Outlet } from "@tanstack/react-router";


export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
