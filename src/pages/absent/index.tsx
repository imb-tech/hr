import ParamPagination from "@/components/param/pagination";
import { ParamInputSearch } from "@/components/param/search-input";
import ParamTabs from "@/components/param/tabs";
import DataTable from "@/components/ui/table";
import Tabs from "@/components/ui/tabs";
import { HR_ABSENTS, POSITION } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Card, CardBody } from "@heroui/card";
import { useSearch } from "@tanstack/react-router";
import { Grid2x2, Table } from "lucide-react";
import { Key, useState } from "react";
import EmployeeCard from "../arrivals/employee-card";
import { useAbsentListCols } from "./cols";
import ParamSelect from "@/components/param/param-select";

export type ViewMode = "table" | "card";

const tabOptions = [
  { key: "", label: "Barchasi (8)" },
  { key: "1", label: "Sababli (5)" },
  { key: "0", label: "Sababsiz (3)" },
];
export const tabs = [
  { key: "table", label: <Table /> },
  { key: "card", label: <Grid2x2 /> },
];

export default function AbsentPage() {
  const search = useSearch({ strict: false });
  const { id, ...otherParams } = search as { id: string; [key: string]: any };
  const [view, setView] = useState<ViewMode>("table");
  const { data: dataPosition } = useGet<Position[]>(POSITION);

  function handleChange(val: Key) {
    if (val === "table" || val === "card") {
      setView(val);
    }
  }

  const {
    data: data,
    isLoading,
    isSuccess,
  } = useGet<ListResponse<Human>>(`${HR_ABSENTS}/${id}`, {
    params: { ...otherParams, page_size: 48 },
    options: { enabled: Boolean(id) },
  });
  const columns = useAbsentListCols();

  const renderCardView = () => (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mb-5">
      {data?.results?.map((item, index) => (
        <EmployeeCard
          item={item}
          status={item.excuses_status == 1 ? "Sababli" : "Sababsiz"}
          color={
            item.excuses_status == 1
              ? "bg-orange-200 text-orange-400"
              : "bg-red-200 text-red-600"
          }
          key={index}
        />
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center gap-3 w-full mb-3">
        <div>
          <ParamTabs tabs={tabOptions} paramName="status" clearOther={false} />
        </div>
        <div className="hidden lg:block">
          <Tabs
            aria-label="Options"
            tabs={tabs}
            onSelectionChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full mb-3">
        <ParamInputSearch />
        <ParamSelect
          className="max-w-full"
          paramName="role_id"
          optionLabelKey="name"
          optionValueKey="id"
          options={dataPosition}
          placeholder="Lavozimlar"
        />
      </div>

      {view === "card" ? (
        <div className="space-y-3">
          {isSuccess && data?.results?.length > 0 ? (
            <>
              {renderCardView()}
              {data?.total_pages > 1 && (
                <ParamPagination total={data?.total_pages} />
              )}
            </>
          ) : (
            <Card>
              <CardBody className="h-72 flex items-center justify-center text-gray-400">
                Ma'lumot topilmadi
              </CardBody>
            </Card>
          )}
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <DataTable
              isLoading={isLoading}
              columns={columns}
              data={data?.results || []}
            />
            {isSuccess && data?.total_pages > 1 ? (
              <ParamPagination total={data?.total_pages} />
            ) : null}
          </div>
          <div className="lg:hidden">{renderCardView()}</div>
        </>
      )}
    </div>
  );
}
