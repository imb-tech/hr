import { ColumnDef } from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { formatDateTime } from "@/lib/format-date";
import { Button } from "@heroui/button";
import { Check, X } from "lucide-react";
import { useMemo } from "react";

export const usSettingsCols = () => {
  const { openModal } = useModal();
  const { setStore: setStoreData } = useStore<StatusType>("status-data");
  const { setStore: setStatus } = useStore<{ status: number | string }>(
    "status",
  );

  function handleItem(item: StatusType) {
    if (!item.id) return;
    setStoreData(item);
    openModal();
  }

  return useMemo<ColumnDef<StatusType>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      {
        header: "FIO",
        dataKey: "full_name",
        cell(value) {
          return <span className="whitespace-nowrap">{value}</span>;
        },
      },
      {
        header: "So'ralgan kunlar",
        dataKey: "start",
        cell(_, item) {
          return (
            <span className="whitespace-nowrap">
              {formatDateTime(item.start)} - {formatDateTime(item.end)}
            </span>
          );
        },
      },
      { header: "Sababi", dataKey: "comment" },
      { header: "Rad etish sababi", dataKey: "response_comment" },
      {
        header: "Holat",
        dataKey: "id",
        cell(_, item) {
          return item.status === 0 ? (
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="min-w-4 "
                onPress={() => {
                  handleItem(item), setStatus({ status: 2 });
                }}
                color="danger"
                variant="light"
              >
                <X size={20} />
              </Button>
              <Button
                size="sm"
                className="min-w-4 "
                onPress={() => {
                  handleItem(item), setStatus({ status: 1 });
                }}
                variant="light"
                color="success"
              >
                <Check size={20} />
              </Button>
            </div>
          ) : (
            <div className={"flex w-full justify-end"}>
              <Button
                className={`flex  ${item.status === 2 ? "justify-end" : "justify-start"}`}
                variant="light"
                color={item.status === 2 ? "danger" : "success"}
              >
                {item.status === 2 ? "Rad etilgan" : "Ruxsat berilgan"}
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );
};
