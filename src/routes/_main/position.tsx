import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import Page from "@/layouts/page";
import PostionsPage from "@/pages/position";
import { Button } from "@heroui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_main/position")({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();
  const { remove } = useStore<Position>("position-data");

  function handleClick() {
    remove();
    openModal();
  }

  return (
    <Page
      breadcrumb={["Lavozimlar"]}
      rightComponent={
        <Button className="flex gap-1" onPress={handleClick}>
          <Plus className="w-5 h-5" />
          Lavozim qo'shish
        </Button>
      }
    >
      <PostionsPage />
    </Page>
  );
}
