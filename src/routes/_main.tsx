import DefaultLayout from "@/layouts/default";
import { createFileRoute, Outlet } from "@tanstack/react-router";


export const Route = createFileRoute("/_main")({
  component: RouteComponent,
  validateSearch: (search: SearchParams): SearchParams => {
    return {
      page: search?.page ?? undefined,
      filter: search.filter ?? undefined,
    };
  },
});

function RouteComponent() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
