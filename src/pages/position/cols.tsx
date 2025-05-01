import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usPostionsCols = () => {
  return useMemo<ColumnDef<Position>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "Lavozim", dataKey: "name",
        cell: (_, itm) => (
          <span className="whitespace-nowrap md:break-all">
            {itm.name}
          </span>
        ),
       },
      {
        header: "Ish vaqti",
        dataKey: "work_shift_end",
        cell: (_, itm) => (
          <span className="whitespace-nowrap md:break-all">
            {itm.work_shift_start?.slice(0, 5)} - {itm.work_shift_end?.slice(0, 5)}
          </span>
        ),
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
