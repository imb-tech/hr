import DataTable from "@/components/ui/table";
import { useGet } from "@/hooks/useGet";
import { useHistoryCols } from "./cols";
import PlanGraph from "./plan-graph";
import PlanProfile from "./plan-profile";

export default function PlansPage() {
  const { data } = useGet<ListResponse<PlanHistory>>("common/client-payouts");
  return (
    <div>
      <PlanProfile />
      <PlanGraph />
      <DataTable
        className="mt-5"
        indexing
        columns={useHistoryCols()}
        data={data?.results ?? []}
      />
    </div>
  );
}
