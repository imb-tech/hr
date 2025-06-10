import Page from "@/layouts/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/plans/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["To'lovlar"]}>
      <div>Sahifa topilmadi</div>
      {/* <div>
        <Button
          className="min-w-4"
          variant="solid"
          onPress={() => navigate({ to: "/plans" })}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      <div className="max-w-3xl mx-auto ">
        <PaymentForm />
      </div>
      <div className="mt-24">
        <h1 className="text-xl  mb-3">To'lovlar tarixi</h1>
        <HistoryPage />
      </div> */}
    </Page>
  );
}
