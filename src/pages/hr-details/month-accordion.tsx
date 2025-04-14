import Accordion from "@/components/ui/accordion";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import DaysAccordion from "./days-accordion";
import MonthTableHeader from "./month-header";

export default function MonthAccordion() {
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
  ];

  function clickAccordion(keys: Selection) {
    const selected = Array.from(keys).filter(Boolean) as string[];
    setSelectedKeys(new Set(selected));

    navigate({
      to: "/hr-view/$id",
      params: { id },
      search: (prev) => ({
        ...prev,
        month: selected.join(","),
      }),
    });
  }

  const month: { [key: number]: string } = {
    1: "Yanvar",
    2: "Fevral",
    3: "Mart",
    4: "Aprel",
    5: "May",
    6: "Iyun",
    7: "Iyul",
    8: "Avgust",
    9: "Sentabr",
    10: "Oktabr",
    11: "Noyabr",
    12: "Dekabr",
  };

  return (
    <div>
      <Accordion
        selectionMode="single"
        style={{
          padding: "0",
        }}
        variant="light"
        items={[
          {
            key: "1",
            title: <MonthTableHeader />,
            content: "hidden",
          },
        ]}
        itemProps={{
          classNames: {
            content: "hidden",
            indicator: "hidden",
            trigger: "!p-0 !px-0 ",
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
            <div className="grid grid-cols-5 gap-11 px-1 ">
              <p className="text-sm">{month[item.id]}</p>
              <p className="text-sm">7 soat</p>
              <p className="text-sm">12 marta</p>
              <p className="text-sm">15 soat 12 minut</p>
              <p className="text-sm">1 000 000 so'm</p>
            </div>
          ),
          content: (
            <div className="pl-6">
              <DaysAccordion />
            </div>
          ),
        }))}
        itemProps={{
          classNames: { trigger: "p-3 dark:bg-zinc-900 bg-zinc-50" },
        }}
      />
    </div>
  );
}
