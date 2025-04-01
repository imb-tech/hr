import { useModal } from "@/hooks/use-modal";
import Page from "@/layouts/page";
import OfficePage from "@/pages/office";
import { Button } from "@heroui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();

  return (
    <Page
      breadcrumb={["Ofislar"]}
      rightComponent={<Button className="flex gap-1" onPress={openModal}><Plus className="w-5 h-5" /> Ofis qo'shish</Button>}
    >
      <OfficePage />
    </Page>
  );
}
