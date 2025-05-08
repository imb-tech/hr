import Page from "@/layouts/page";
import ArrivalsPage from "@/pages/arrivals";
import { Button } from "@heroui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_main/arrivals")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <Page
      leftComponent={
        <Button
          variant="flat"
          className="min-w-4"
          onPress={() => navigate({ to: "/" })}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      }
      breadcrumb={["Kelganlar ro'yxati"]}
    >
      <ArrivalsPage />
    </Page>
  );
}
