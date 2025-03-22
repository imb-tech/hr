import NewLoginPage from "@/pages/new-login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new-login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewLoginPage />;
}
