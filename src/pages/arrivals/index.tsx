import ParamTabs from "@/components/param/tabs";
import DataTable from "@/components/ui/table";
import Tabs from "@/components/ui/tabs";
import { HR_API } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useSearch } from "@tanstack/react-router";
import { Grid2x2, Table } from "lucide-react";
import { Key, useState } from "react";
import { useArrivalsListCols } from "./cols";
import EmployeeCard from "./employee-card";

type ViewMode = "table" | "card";

const tabOptions = [
  { key: "0", label: "Barchasi" },
  { key: "1", label: "Vaqtida kelganlar" },
  { key: "2", label: "Kech qolganlar" },
];
const tabs = [
  { key: "table", label: <Table /> },
  { key: "card", label: <Grid2x2 /> },
];

export default function ArrivalsPage() {
  const search = useSearch({ strict: false });
  const [view, setView] = useState<ViewMode>("table");

  function handleChange(val: Key) {
    if (val === "table" || val === "card") {
      setView(val);
    }
  }

  const { data, isLoading } = useGet<ListResponse<Human>>(HR_API, {
    params: search,
  });
  const columns = useArrivalsListCols();

  const renderCardView = () => (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mb-5">
      {Array.from({ length: 9 }).map((_, index) => (
        <EmployeeCard key={index} />
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center gap-3 w-full">
        <div>
          <ParamTabs tabs={tabOptions} paramName="status" clearOther={false} />
        </div>
        <div className="hidden md:block">
          <Tabs
            aria-label="Options"
            tabs={tabs}
            onSelectionChange={handleChange}
          />
        </div>
      </div>

      {view === "card" ? (
        renderCardView()
      ) : (
        <>
          <div className="hidden md:block">
            <DataTable
              isLoading={isLoading}
              columns={columns}
              data={data?.results ?? []}
            />
          </div>
          <div className="md:hidden">{renderCardView()}</div>
        </>
      )}
    </div>
  );
}
