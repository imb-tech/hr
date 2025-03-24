import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usPostionsCols = () => {
  return useMemo<ColumnDef<Positon>[]>(
    () => [
      { header: "ID", dataKey: "id", sortable: true },
      { header: "Lavozim", dataKey: "positon", sortable: true },
      { header: "Ish vaqti", dataKey: "work_time", sortable: true },
    ],
    [],
  );
};
