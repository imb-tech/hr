import Page from "@/layouts/page";
import TaskManagment from "@/pages/task-managment";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/task-managment")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page breadcrumb={["Vazifalarni boshqarish"]}>
      <TaskManagment />
    </Page>
  );
}
