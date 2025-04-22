import { useModal } from "@/hooks/use-modal";
import Page from "@/layouts/page";
import OfficeDetail from "@/pages/office-detail";
import { Button } from "@heroui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";

export const Route = createFileRoute("/_main/office/$id")({
  component: RouteComponent,
  validateSearch: (s: { tab?: string }) => s,
});

function RouteComponent() {
  const { openModal } = useModal();
  function handleClick() {
    openModal();
  }
  return (
    <Page
      breadcrumb={["Ofis", "Ofis ma'lumotlari va hodimlar"]}
      rightComponent={
        <Button onPress={handleClick}>
          <Users size={18} /> Hodimlar
        </Button>
      }
    >
      <OfficeDetail />
    </Page>
  );
}
