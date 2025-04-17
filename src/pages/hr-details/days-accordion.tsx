import Accordion from "@/components/ui/accordion";
import { USER_YEAR_TOTAL_MONTH_DAYS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Skeleton } from "@heroui/skeleton";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { format } from "date-fns";
import { useState } from "react";
import DaysTableHeader from "./days-header";
import OneDaysAccordion from "./one-day-statistic";

export const statusData: { [key: number | string]: string } = {
  0: "Kutilmoqda",
  1: "Qabul qilingan",
  2: "Rad etilgan",
};

export default function DaysAccordion() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/hr-view/$id" });
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const search = useSearch({ strict: false });
  const {
    data: info,
    isSuccess,
    isLoading,
  } = useGet<HumanYear[]>(`${USER_YEAR_TOTAL_MONTH_DAYS}/${id}`, {
    params: { year: (search as any)?.year, month: (search as any)?.month },
    options: {
      enabled: Boolean((search as any)?.month),
    },
  });

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


  const accordionItems = isLoading
    ? [
        {
          key: "loading",
          title: (
            <div className="grid grid-cols-7 gap-11 px-1">
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
            </div>
          ),
          content: "",
        },
      ]
    : isSuccess && info.length === 0
      ? [
          {
            key: "empty",
            title: (
              <div className="px-3 text-sm text-zinc-500 text-center">
                Ma'lumot topilmadi
              </div>
            ),
            content: "",
          },
        ]
      : isSuccess &&
        info?.map((item) => ({
          key: item.id.toString(),
          title: (
            <div className="grid grid-cols-7 gap-11 rounded-b-lg">
              <p className="text-sm">{item.id > 9 ? item.id : "0" + item.id}</p>
              <p className="text-sm">
                {format(new Date(item?.attendance_time), "HH:mm")}
              </p>
              <p className="text-sm">{item.late_duration?.slice(0, 5)}</p>
              <p className="text-sm">{item?.shift_start_time?.slice(0, 5)}</p>
              <p className="text-sm">{item?.shift_end_time?.slice(0, 5)}</p>
              <p className="text-sm">{item.early_checkout?.slice(0, 5)}</p>
              <p className="text-sm">{statusData[item.status]}</p>
            </div>
          ),
          content: (
            <div className="pl-6  ">
              <OneDaysAccordion />
            </div>
          ),
        }));

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
        items={accordionItems || []}
        itemProps={{ classNames: { trigger: "p-3 dark:bg-neutral-900 " } }}
      />
    </div>
  );
}
