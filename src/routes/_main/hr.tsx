import Page from "@/layouts/page";
import HrPage from "@/pages/hr";
import { Button } from "@heroui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hr")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <Page
      breadcrumb={["Xodimlar"]}
      rightComponent={
        <Button onPress={() => navigate({ to: "/hr-create" })}>
          Xodim qo'shish
        </Button>
      }
    >
      <HrPage />
    </Page>
  );
}
