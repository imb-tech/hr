import Accordion from "@/components/ui/accordion";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import DaysTableHeader from "./days-header";
import OneDaysAccordion from "./one-day-statistic";

export default function DaysAccordion() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/hr-view/$id" });
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  // const { data: info } = useGet<OfficeInfo[]>(`${ROLES_STATISTIC}`);

  const info = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
    { id: 30 },
  ];

  function clickAccordion(keys: Selection) {
    const selected = Array.from(keys).filter(Boolean) as string[];
    setSelectedKeys(new Set(selected));

    navigate({
      to: "/hr-view/$id",
      params: { id },
      search: (prev) => ({
        ...prev,
        day: selected.join(","),
      }),
    });
  }

  return (
    <div>
      <Accordion
        selectionMode="single"
        variant="light"
        style={{
          padding: "0",
        }}
        items={[
          {
            key: "2",
            title: <DaysTableHeader />,
            content: "hidden",
          },
        ]}
        itemProps={{
          classNames: {
            content: "hidden",
            indicator: "hidden",
            trigger: "!p-0 !px-0",
          },
        }}
      />
      <Accordion
        style={{
          padding: "0",
        }}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={clickAccordion}
        items={info?.map((item) => ({
          key: item.id.toString(),
          title: (
            <div className="grid grid-cols-7 gap-11 rounded-b-lg">
              <p className="text-sm">{item.id > 9 ? item.id : "0" + item.id}</p>
              <p className="text-sm">10:30</p>
              <p className="text-sm">20 minut</p>
              <p className="text-sm">09:00</p>
              <p className="text-sm">18:00</p>
              <p className="text-sm">10 minut</p>
              <p className="text-sm">Kech qolgan</p>
            </div>
          ),
          content: (
            <div className="pl-6  ">
              <OneDaysAccordion />
            </div>
          ),
        }))}
        itemProps={{ classNames: { trigger: "p-3 dark:bg-neutral-900 " } }}
      />
    </div>
  );
}
