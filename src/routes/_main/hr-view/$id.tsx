import Page from "@/layouts/page";
import ViewPage from "@/pages/hr/view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hr-view/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["Hodim haqida to'liq ma'lumot"]}>
      <ViewPage/>
    </Page>
  );
}
