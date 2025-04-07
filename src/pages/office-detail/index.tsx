import Accordion from "@/components/ui/accordion";
import DataTable from "@/components/ui/table";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { useWorkerInfoCols } from "./cols";
import OfficeInfoRow from "./office-info-row";
import OfficeProfile from "./office-profile";
import OfficeDetailTableHeader from "./table-header";

const info: OfficeInfo[] = [
  {
    position: "Menejer",
    workers: 11,
    in_office: 6,
    lated: 2,
    dont_came: 1,
    early_left: 0,
  },
  {
    position: "Dispetcher",
    workers: 10,
    in_office: 6,
    lated: 2,
    dont_came: 1,
    early_left: 1,
  },
];
const data: WorkerInfo[] = [
  {
    id: 1,
    full_name: "Ozodbek",
    coming_time: "08:56",
    work_duration: "8s 15 min",
    lating_time: "0 min",
    early_left: "15 min",
    live_location: "Ishda",
    left_time: "18:32",
  },
];

export default function OfficeDetail() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/office/$id" });
  const search = useSearch({ from: "/_main/office/$id" });


  function clickAccordion(keys: Selection) {
    navigate({
      to: "/office/$id",
      params: { id },
      search: {
        tab: Array.from(keys)
          ?.map((s) => Number(s))
          ?.join(","),
      },
    });
  }
  const selectedKeys = useMemo(
    () => new Set(search?.tab?.split(",")),
    [search],
  );

  const columns = useWorkerInfoCols();

  return (
    <div>
      <OfficeProfile />

      <Accordion
        selectionMode="multiple"
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
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => clickAccordion(keys)}
        items={info?.map((c, i) => ({
          key: i.toString(),
          title: <OfficeInfoRow data={c} />,
          content: (
            <DataTable
              shadow="none"
              isHeaderSticky
              columns={columns}
              data={data}
              onEdit={(item) => console.log(item)}
              onRowClick={(item) => console.log(item)}
            />
          ),
        }))}
        itemProps={{ classNames: { trigger: "!px-0 py-1" } }}
      />
    </div>
  );
}
