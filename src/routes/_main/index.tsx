import { COMPANIES } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data, isLoading } = useGet<FeatureCollection>(COMPANIES);
  useEffect(() => {
    if (data?.features?.[0]?.id) {
      navigate({
        to: "/office/$id",
        params: { id: data?.features?.[0]?.id.toString() },
      });
    } else {
      navigate({
        to: "/office/$id",
        params: { id: "1" },
      });
    }
  }, [data]);

  return (
    <div className=" p-6 rounded-md max-auto">
      {isLoading ? "Sahifa yuklanmoqda" : ""}
    </div>
  );
}
