import Page from "@/layouts/page";
import PositionHrView from "@/pages/office-detail/position";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/position-hr-view/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["Ofis", "Lavozim", "Hodimlar"]}>
      <PositionHrView />
    </Page>
  );
}
