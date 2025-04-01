import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usPostionsCols = () => {
  return useMemo<ColumnDef<Position>[]>(
    () => [
      { header: "ID", dataKey: "id", sortable: true },
      { header: "Lavozim", dataKey: "poisiton", sortable: true },
      {
        header: "Ish vaqti",
        dataKey: "end_date",
        sortable: true,
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
