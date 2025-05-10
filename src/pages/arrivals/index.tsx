import ParamPagination from "@/components/param/pagination";
import { ParamInputSearch } from "@/components/param/search-input";
import ParamTabs from "@/components/param/tabs";
import DataTable from "@/components/ui/table";
import Tabs from "@/components/ui/tabs";
import { HR_ATTENDED } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Card, CardBody } from "@heroui/card";
import { useSearch } from "@tanstack/react-router";
import { Grid2x2, Table } from "lucide-react";
import { Key, useState } from "react";
import { useArrivalsListCols } from "./cols";
import EmployeeCard from "./employee-card";

type ViewMode = "table" | "card";

const tabOptions = [
  { key: "", label: "Barchasi" },
  { key: "1", label: "Vaqtida kelganlar" },
  { key: "0", label: "Kech qolganlar" },
];

const tabs = [
  { key: "table", label: <Table /> },
  { key: "card", label: <Grid2x2 /> },
];

export default function ArrivalsPage() {
  const search = useSearch({ strict: false });
  const { id, ...otherParams } = search as { id: string; [key: string]: any };
  const [view, setView] = useState<ViewMode>("table");

  function handleChange(val: Key) {
    if (val === "table" || val === "card") {
      setView(val);
    }
  }

  const { data, isLoading, isSuccess } = useGet<ListResponse<Human>>(
    `${HR_ATTENDED}/${id}`,
    {
      params: { ...otherParams, page_size: 48 },
      options: { enabled: Boolean(id) },
    },
  );
  const columns = useArrivalsListCols();

  const renderCardView = () => (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mb-5">
      {data?.results?.map((item, index) => (
        <EmployeeCard
          item={item}
          color={
            item.attendance_status == 1
              ? "bg-green-200 text-green-400"
              : "bg-orange-200 text-orange-300"
          }
          status={
            item.attendance_status == 1 ? "Vaqtida kelgan" : "Kech qolgan"
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

      <div className="flex justify-between items-center gap-3 w-full mb-3">
        <ParamInputSearch />
      </div>

      {view === "card" ? (
        <>
          {isSuccess && data?.results?.length > 0 ? (
            <div className="space-y-3">
              {renderCardView()}
              {data?.total_pages > 1 && (
                <ParamPagination total={data?.total_pages} />
              )}
            </div>
          ) : (
            <Card>
              <CardBody className="h-72 flex items-center justify-center text-gray-400">
                Ma'lumot topilmadi
              </CardBody>
            </Card>
          )}
        </>
      ) : (
        <>
          <div className="hidden lg:block">
            <DataTable
              isLoading={isLoading}
              columns={columns}
              data={data?.results ?? []}
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
