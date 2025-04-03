import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usPostionsCols = () => {
  return useMemo<ColumnDef<Position>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "Lavozim", dataKey: "name" },
      {
        header: "Ish vaqti",
        dataKey: "work_shift_end",
        cell: (_, itm) => (
          <span>
            {itm.work_shift_start} - {itm.work_shift_end}
          </span>
        ),
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
