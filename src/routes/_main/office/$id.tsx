import Page from "@/layouts/page";
import OfficeDetail from "@/pages/office-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/office/$id")({
  component: RouteComponent,
  validateSearch: (s: { tab?: string }) => s,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["Ofislar", "Ofis ma'lumotlari va hodimlar"]}>
      <OfficeDetail />
    </Page>
  );
}
