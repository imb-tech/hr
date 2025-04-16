import Accordion from "@/components/ui/accordion";
import { USER_YEAR_TOTAL } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import MonthAccordion from "./month-accordion";
import YearsTableHeader from "./years-header";


export default function YearsAccordion() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/hr-view/$id" });
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { data: info } = useGet<HumanYear[]>(`${USER_YEAR_TOTAL}/${id}`);

  function clickAccordion(keys: Selection) {
    const selected = Array.from(keys).filter(Boolean) as string[];
    setSelectedKeys(new Set(selected));

    navigate({
      to: "/hr-view/$id",
      params: { id },
      search: {
        year: selected.join(","),
      },
    });
  }

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
            title: <YearsTableHeader />,
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
          key: item.year.toString(),
          title: (
            <div className="grid grid-cols-4 gap-11 px-1 ">
              <p className="text-sm">{item.year}</p>
              <p className="text-sm">{item.late_count} marta</p>
              <p className="text-sm">{item.late_duraction || 0} soat</p>
              <p className="text-sm">{item.fine} so'm</p>
            </div>
          ),
          content: (
            <div className="pl-6">
              <MonthAccordion />
            </div>
          ),
        }))}
        itemProps={{
          classNames: {
            trigger: "!px-3 dark:bg-neutral-900 bg-neutral-50 rounded-b-lg",
            indicator: "",
          },
        }}
      />
    </div>
  );
}
