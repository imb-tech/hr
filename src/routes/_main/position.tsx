import { useModal } from "@/hooks/use-modal";
import Page from "@/layouts/page";
import PostionsPage from "@/pages/postion";
import { Button } from "@heroui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/position")({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();

  return (
    <Page
      breadcrumb={["Lavozimlar"]}
      rightComponent={<Button onPress={openModal}>Yangi</Button>}
    >
      <PostionsPage />
    </Page>
  );
}
