import Page from "@/layouts/page";
import CreatePlan from "@/pages/plans/create-plan";
import { plans } from "@/pages/plans/plan-selector";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/plans/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_main/plans/$id" });
  const breadcrumb = plans?.find((el) => el.id === id);
  return (
    <Page breadcrumb={["To'lov va obunalar", breadcrumb?.name ?? ""]}>
      <CreatePlan />
    </Page>
  );
}
