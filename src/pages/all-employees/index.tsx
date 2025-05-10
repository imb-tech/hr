import ParamPagination from "@/components/param/pagination";
import ParamTabs from "@/components/param/tabs";
import DataTable from "@/components/ui/table";
import Tabs from "@/components/ui/tabs";
import { ALL_EMPLOYEES } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Card, CardBody } from "@heroui/card";
import { useSearch } from "@tanstack/react-router";
import { Grid2x2, Table } from "lucide-react";
import { Key, useState } from "react";
import EmployeeCard from "../arrivals/employee-card";
import { useAllEmployeesListCols } from "./cols";
import { ParamInputSearch } from "@/components/param/search-input";

type ViewMode = "table" | "card";

const tabOptions = [
  { key: "", label: "Barchasi" },
  { key: "1", label: "Kelganlar" },
  { key: "0", label: "Kelmaganlar" },
];
const tabs = [
  { key: "table", label: <Table /> },
  { key: "card", label: <Grid2x2 /> },
];

export default function AllEmployeesPage() {
  const search = useSearch({ strict: false });
  const { id, ...otherParams } = search as { id: string; [key: string]: any };
  const [view, setView] = useState<ViewMode>("table");

  function handleChange(val: Key) {
    if (val === "table" || val === "card") {
      setView(val);
    }
  }

  const {
    data: data,
    isLoading,
    isSuccess,
  } = useGet<ListResponse<Human>>(`${ALL_EMPLOYEES}/${id}`, {
    params: { ...otherParams, page_size: 48 },
    options: { enabled: Boolean(id) },
  });
  const columns = useAllEmployeesListCols();

  const renderCardView = () => (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mb-5">
      {data?.results?.map((item, index) => (
        <EmployeeCard
          item={item}
          status={
            item.has_attendance
              ? item.attendance_status == 1
                ? "Vaqtida kelgan"
                : "Kech qolgan"
              : item.excuses_status == 1
                ? "Sababli"
                : "Sababsiz"
          }
          color={
            item.has_attendance
              ? item.attendance_status == 1
                ? "text-green-400 bg-green-200"
                : "text-orange-300 bg-orange-200"
              : item.excuses_status == 1
                ? "text-orange-400 bg-orange-200"
                : "text-red-500 bg-red-200"
          }
          key={index}
        />
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center gap-3 w-full">
        <div>
          <ParamTabs
            tabs={tabOptions}
            paramName="has_attendance"
            clearOther={false}
          />
        </div>
        <div className="hidden md:block">
          <Tabs
            aria-label="Options"
            tabs={tabs}
            onSelectionChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 w-full mb-4">
        <ParamInputSearch />
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
          <div className="hidden md:block">
            <DataTable
              isLoading={isLoading}
              columns={columns}
              data={data?.results || []}
            />
            {isSuccess && data?.total_pages > 1 ? (
              <ParamPagination total={data?.total_pages} />
            ) : null}
          </div>
          <div className="md:hidden">{renderCardView()}</div>
        </>
      )}
    </div>
  );
}
