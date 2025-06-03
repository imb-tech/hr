import { ColumnDef } from "@/components/ui/table";
import { Checkbox } from "@heroui/checkbox";
import { useMemo } from "react";

export const useCols = () =>
  useMemo<ColumnDef<PlanUser>[]>(
    () => [
      {
        header: "Tanlash",
        dataKey: "id",
        cell() {
          return (
            <div className="flex items-center">
              <Checkbox />
            </div>
          );
        },
      },
      {
        header: "Hodim",
        dataKey: "name",
      },
    ],
    [],
  );
