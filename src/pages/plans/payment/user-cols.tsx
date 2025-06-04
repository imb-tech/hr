import { ColumnDef } from "@/components/ui/table";
import { cn } from "@heroui/theme";
import { useMemo } from "react";
import { UsersType } from ".";

export const usUsersCols = () => {
  return useMemo<ColumnDef<UsersType>[]>(
    () => [
      {
        header: "Lavozim",
        dataKey: "position",
      },
      {
        header: "FIO",
        dataKey: "full_name",
      },
      {
        header: "To'lov holati",
        dataKey: "status",
        cell: (_, itm) => (
          <div
            className={cn(
              "whitespace-nowrap text-center",
              itm.status ? "text-green-500" : "text-red-500",
            )}
          >
            {itm.status ? "Aktiv " : "Aktiv emas"}
          </div>
        ),
      },
    ],
    [],
  );
};
