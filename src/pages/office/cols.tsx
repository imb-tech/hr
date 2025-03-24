import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usOfficeCols = () => {
  return useMemo<ColumnDef<Office>[]>(
    () => [
      { header: "ID", dataKey: "id", sortable: true },
      { header: "Nomi", dataKey: "name", sortable: true },
      { header: "Manzil", dataKey: "address", sortable: true },
      { header: "Hodimlar soni", dataKey: "users", sortable: true },
      { header: "Ish vaqti", dataKey: "work_time", sortable: true },
    ],
    [],
  );
};
