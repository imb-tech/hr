import Page from "@/layouts/page";
import OfficeDetail from "@/pages/office-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/office/$id")({
  component: RouteComponent,
  validateSearch: (search: Record<string, string | undefined>) => {
    return { tab: search?.tab ?? undefined };
  },
});

function RouteComponent() {
  return (
    <Page breadcrumb={["Ofislar", "Ofis ma'lumotlari va hodimlar"]}>
      <OfficeDetail />
    </Page>
  );
}
