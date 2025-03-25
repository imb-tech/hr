import Page from "@/layouts/page";
import CreateHrForm from "@/pages/hr/create-hr-form";
import { Button } from "@heroui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hr-edit/$hr-edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <Page
      breadcrumb={["Xodimlar"]}
      rightComponent={
        <Button onPress={() => navigate({ to: "/hr" })}>Ortga</Button>
      }
    >
      <CreateHrForm />
    </Page>
  );
}
