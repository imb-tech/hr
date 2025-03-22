import DriversPage from "@/pages/drivers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/drivers")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DriversPage />;
}
