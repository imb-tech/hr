import Page from "@/layouts/page";
import HistoryPage from "@/pages/plans/payment/history";
import PaymentForm from "@/pages/plans/payment/payment-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/plans/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["To'lovlar"]}>
      <div className="max-w-3xl mx-auto ">
        <PaymentForm />
      </div>
      <div className="mt-24">
        <h1 className="text-xl  mb-3">To'lovlar tarixi</h1>
        <HistoryPage />
      </div>
    </Page>
  );
}
