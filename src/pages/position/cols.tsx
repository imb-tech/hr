import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usPostionsCols = () => {
  return useMemo<ColumnDef<Position>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "Lavozim", dataKey: "poisiton" },
      {
        header: "Ish vaqti",
        dataKey: "end_date",
        cell: (_, itm) => (
          <span>
            {itm.start_date} - {itm.end_date}
          </span>
        ),
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
