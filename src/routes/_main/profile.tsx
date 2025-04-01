import Page from "@/layouts/page";
import Profilepage from "@/pages/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["Profil"]}>
      <Profilepage />
    </Page>
  );
}
