import { ColumnDef } from "@/components/ui/table";
import { formatMoney } from "@/lib/format-money";
import { cn } from "@heroui/theme";
import { format } from "date-fns";
import { useMemo } from "react";
import { PymentType } from "./history";

export const usHistoryCols = () => {
  return useMemo<ColumnDef<PymentType>[]>(
    () => [
      {
        header: "Summasi",
        dataKey: "amount",
        cell: (_, itm) => (
          <span className="whitespace-nowrap md:break-all">
            {formatMoney(itm.amount)}
          </span>
        ),
      },
      {
        header: "To'lov turi",
        dataKey: "method",
        cell: (_, itm) => (
          <span className="whitespace-nowrap md:break-all">{itm.method}</span>
        ),
      },
      {
        header: "To'lov sanai",
        dataKey: "method",
        cell: (_, itm) => (
          <span className="whitespace-nowrap md:break-all">
            {format(itm.date, "yyyy-MM-mm HH:mm")}
          </span>
        ),
      },
      {
        header: "To'lov holati",
        dataKey: "status",
        cell: (_, itm) => (
          <div
            className={cn(
              "whitespace-nowrap text-center",
              itm.status === "success" ? "text-green-500" : "text-red-500",
            )}
          >
            {itm.status}
          </div>
        ),
      },
    ],
    [],
  );
};
