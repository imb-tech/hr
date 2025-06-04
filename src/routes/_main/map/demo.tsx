import Page from "@/layouts/page";
import DemoMapPage from "@/pages/map/demo-map";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/map/demo")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["Xarita"]}>
      <DemoMapPage />
    </Page>
  );
}
