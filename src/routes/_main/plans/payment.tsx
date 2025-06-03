import Page from "@/layouts/page";
import PaymentPage from "@/pages/plans/payment";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/plans/payment")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["To'lov"]}>
      <PaymentPage />
    </Page>
  );
}
