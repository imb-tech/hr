import Accordion from "@/components/ui/accordion";
import Modal from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Selection } from "@react-types/shared";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import FullCalendarEmployees from "../employees/full-calendar";
import { Eraser } from "lucide-react";

type Props = {
  info: Position[] | undefined;
};

export type Selected = {
  customer: number;
  month: number[];
};

function PositionAccordionTraffic({ info }: Props) {
  const [selected, setSelected] = useState<Selected[]>([]);
  const search = useSearch({ from: "/_main/plans/" });
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { openModal } = useModal("postion-traffic");

  const toggleMonth = (customerId: number, month: number) => {
    setSelected((prev) => {
      const existing = prev.find((item) => item.customer === customerId);

      if (existing) {
        const alreadySelected = existing.month.includes(month);
        const updatedMonths = alreadySelected
          ? existing.month.filter((m) => m !== month)
          : [...existing.month, month];

        return updatedMonths.length
          ? prev.map((item) =>
              item.customer === customerId
                ? { ...item, month: updatedMonths }
                : item,
            )
          : prev.filter((item) => item.customer !== customerId);
      } else {
        return [...prev, { customer: customerId, month: [month] }];
      }
    });
  };

  function clickAccordion(keys: Selection) {
    const selectedIds = Array.from(keys)
      .map((key) => info?.[Number(key)]?.id)
      .filter(Boolean);

    setSelectedKeys(keys as Set<string>);

    navigate({
      to: "/plans",
      search: {
        position: selectedIds.join(","),
      },
    });
  }

  return (
    <div>
      {!!info ? (
        <div className="overflow-x-auto ">
          <div className="min-w-[1024px]">
            <Accordion
              itemProps={{
                classNames: {
                  content: "hidden",
                  indicator: "opacity-0",
                  trigger: "!pb-0",
                },
              }}
              items={[
                {
                  key: "1",
                  title: (
                    <h1 className="text-xl">Lavozimlar bo'yicha obunalar</h1>
                  ),
                  content: null,
                },
              ]}
              selectionMode="single"
              variant="light"
            />
            <Accordion
              itemProps={{ classNames: { trigger: "!px-0 py-3" } }}
              items={info?.map((c, i) => ({
                key: i.toString(),
                title: (
                  <div className="w-full flex justify-between">
                    <span>{c.name}</span>{" "}
                    {selected?.length > 0 && c.id == search.position && (
                     <div className="flex items-center gap-3">
                       <Button size="sm" color="danger" onPress={()=>setSelected([])}>
                        Tozalash <Eraser size={16} />
                      </Button>
                       <Button size="sm" color="primary" onPress={openModal}>
                        Obunani Bekor qilish
                      </Button>
                     </div>
                    )}
                  </div>
                ),
                content: (
                  <FullCalendarEmployees
                    toggleMonth={toggleMonth}
                    selected={selected}
                  />
                ),
              }))}
              selectedKeys={selectedKeys}
              selectionMode="single"
              onSelectionChange={clickAccordion}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col gap-3 w-full justify-center bg-gray-500/20 rounded-md my-2">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      )}

      <Modal title="Obunalarni bekor qilish" modalKey="postion-traffic">
        <div>
          <p>
            Tanlangan oylar bo'yicha hodimlardan obuna bekor qilinadi. Ushbu
            amalni bajarishga rozimisiz?
          </p>
        </div>
        <Button color="danger">Obunani Bekor qilish</Button>
      </Modal>
    </div>
  );
}

export default PositionAccordionTraffic;
