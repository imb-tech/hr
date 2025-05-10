import Accordion from "@/components/ui/accordion";
import DataTable from "@/components/ui/table";
import { USER_STATISTIC } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useWorkerInfoCols } from "./cols";
import OfficeInfoRow from "./office-info-row";
import OfficeDetailTableHeader from "./table-header";
type Props = {
  info: CompanyStats[] | undefined;
};
 
function PositionAccordion({ info }: Props) {
  const { id } = useParams({ from: "/_main/office/$id" });
  const search = useSearch({ from: "/_main/office/$id" });
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const { data, isSuccess } = useGet<WorkerAttendance[]>(
    `${USER_STATISTIC}/${search?.tab}/${id}`,
    {
      options: { enabled: Boolean(id) && Boolean(search?.tab) },
    },
  );

  function clickAccordion(keys: Selection) {
    const selectedIds = Array.from(keys)
      .map((key) => info?.[Number(key)]?.id)
      .filter(Boolean);

    setSelectedKeys(keys as Set<string>);

    navigate({
      to: "/office/$id",
      params: { id },
      search: {
        tab: selectedIds.join(","),
      },
    });
  }
  const columns = useWorkerInfoCols();

  return (
    <div>
      {info?.length ? (
        <div className="overflow-x-auto hidden lg:block">
          <div className="min-w-[1024px]">
            <Accordion
              selectionMode="single"
              variant="light"
              items={[
                {
                  key: "1",
                  title: <OfficeDetailTableHeader />,
                  content: null,
                },
              ]}
              itemProps={{
                classNames: {
                  content: "hidden",
                  indicator: "opacity-0",
                  trigger: "!pb-0",
                },
              }}
            />
            <Accordion
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={clickAccordion}
              items={info?.map((c, i) => ({
                key: i.toString(),
                title: <OfficeInfoRow data={c} />,
                content: (
                  <div>
                    <DataTable
                      shadow="none"
                      isHeaderSticky
                      columns={columns}
                      data={isSuccess && data.length > 0 ? data : []}
                    />
                  </div>
                ),
              }))}
              itemProps={{ classNames: { trigger: "!px-0 py-1" } }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center h-48 w-full justify-center bg-gray-500/20 rounded-md my-2">
          <p className="text-gray-500/95">Lavozimlar ma'lumoti topilmadi</p>
        </div>
      )}
    </div>
  );
}

export default PositionAccordion;
