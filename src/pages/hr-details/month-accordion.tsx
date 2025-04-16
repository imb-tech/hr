import Accordion from "@/components/ui/accordion";
import { USER_YEAR_TOTAL_MONTH } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import DaysAccordion from "./days-accordion";
import MonthTableHeader from "./month-header";

export default function MonthAccordion() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/hr-view/$id" });
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const search = useSearch({ strict: false });
  const { data: info } = useGet<HumanYear[]>(`${USER_YEAR_TOTAL_MONTH}/${id}`, {
    params: search,
    options: { enabled: Boolean((search as any)?.year) },
  });

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
          key: item.month.toString(),
          title: (
            <div className="grid grid-cols-4 gap-11 px-1 ">
              <p className="text-sm">{month[item.month as any]}</p>
              <p className="text-sm">{item.late_count} marta</p>
              <p className="text-sm">{item.late_duration}</p>
              <p className="text-sm">{item.fine} so'm</p>
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
