import Page from "@/layouts/page";
import HrPage from "@/pages/hr";
import { Button } from "@heroui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_main/hr")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <Page
      breadcrumb={["Hodimlar"]}
      rightComponent={
        <Button
          className="flex gap-1"
          onPress={() => navigate({ to: "/hr-create" })}
        >
          <Plus className="w-5 h-5" /> Hodim qo'shish
        </Button>
      }
    >
      <HrPage />
    </Page>
  );
}
