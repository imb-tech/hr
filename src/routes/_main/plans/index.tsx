import Page from "@/layouts/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/plans/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["To'lov va obunalar"]}>
      {/* <PlansPage /> */}
      <div>Sahifa topilmadi</div>
    </Page>
  );
}
