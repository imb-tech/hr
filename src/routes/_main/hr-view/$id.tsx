import Page from "@/layouts/page";
import ViewPage from "@/pages/hr-details/view";
import { Button } from "@heroui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_main/hr-view/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate()
  return (
    <Page
      breadcrumb={["Hodim ma'lumoti"]}
      leftComponent={
        <Button
          className="min-w-4"
          variant="flat"
          onPress={() => navigate({ to: "/hr" })}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      }
    >
      <ViewPage />
    </Page>
  );
}
