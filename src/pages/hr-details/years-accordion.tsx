import Accordion from "@/components/ui/accordion";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import MonthAccordion from "./month-accordion";
import YearsTableHeader from "./years-header";

export default function YearsAccordion() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/hr-view/$id" });
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  // const { data: info } = useGet<OfficeInfo[]>(`${ROLES_STATISTIC}`);

  const info = [{ id: 2024 }, { id: 2025 }];

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
          padding: "0 0 0 24px",
        }}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={clickAccordion}
        items={info?.map((item) => ({
          key: item.id.toString(),
          title: (
            <div className="grid grid-cols-5 gap-11 px-1 ">
              <p className="text-sm">{item.id}</p>
              <p className="text-sm">70 soat</p>
              <p className="text-sm">120 marta</p>
              <p className="text-sm">150 soat 12 minut</p>
              <p className="text-sm">10 000 000 so'm</p>
            </div>
          ),
          content: (
            <div>
              <MonthAccordion />
            </div>
          ),
        }))}
        itemProps={{
          classNames: {
            trigger: "!px-0",
            indicator: "transition-transform duration-200 transform",
          },
          indicator: ({ isOpen }) => (
            <span
              className={`${
                isOpen ? "-rotate-180" : "-rotate-90"
              } transform transition-all duration-300`}
            >
              <ChevronDown />
            </span>
          ),
        }}
      />
    </div>
  );
}
