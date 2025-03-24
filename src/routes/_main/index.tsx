import { useModal } from "@/hooks/use-modal";
import Page from "@/layouts/page";
import OfficePage from "@/pages/office";
import { Button } from "@heroui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();

  return (
    <Page
      breadcrumb={["Ofislar"]}
      rightComponent={<Button onPress={openModal}>Yangi</Button>}
    >
      <OfficePage />
    </Page>
  );
}
