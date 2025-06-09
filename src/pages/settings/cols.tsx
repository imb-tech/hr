import PopoverImage from "@/components/elements/popover-image";
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
      {
        header: "Rasm",
        dataKey: "face",
        cell: (_,item) => {
          return (
            <div className="max-w-8">
              <PopoverImage image={item.face} />
            </div>
          );
        },
      },
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
      {
        header: "Sababi",
        dataKey: "comment",
        cell(value) {
          return (
            <span className="whitespace-nowrap lg:break-all">{value}</span>
          );
        },
      },
      {
        header: "Rad etish sababi",
        dataKey: "response_comment",
        cell(value) {
          return (
            <span className="whitespace-nowrap lg:break-all">{value}</span>
          );
        },
      },
      {
        header: "Holat",
        dataKey: "id",
        cell(_, item) {
          return item.status === 0 ? (
            <div className="flex items-center justify-end">
              <Button
                className="min-w-4 "
                color="danger"
                size="sm"
                variant="light"
                onPress={() => {
                  handleItem(item), setStatus({ status: 2 });
                }}
              >
                <X size={20} />
              </Button>
              <Button
                className="min-w-4 "
                color="success"
                size="sm"
                variant="light"
                onPress={() => {
                  handleItem(item), setStatus({ status: 1 });
                }}
              >
                <Check size={20} />
              </Button>
            </div>
          ) : (
            <div className={"flex w-full justify-end"}>
              <Button
                className={`flex  ${item.status === 2 ? "justify-end" : "justify-start"}`}
                color={item.status === 2 ? "danger" : "success"}
                variant="light"
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
