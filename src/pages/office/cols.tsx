import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usOfficeCols = () => {
  return useMemo<ColumnDef<Office>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      {
        header: "Nomi",
        dataKey: "id",
        cell: (_, item) => <span>{item.properties.name}</span>,
      },
      {
        header: "Manzil",
        dataKey: "id",
        cell: (_, item) => <span>{item.properties.address}</span>,
      },
      {
        header: "Hodimlar soni",
        dataKey: "id",
        cell: (_, itm) => (
          <span>
            {itm.properties.employee_count}
          </span>
        ),
      },
      {
        header: "Tushlik vaqti",
        dataKey: "id",
        cell: (_, itm) => (
          <span>
            {itm.properties.lunch_start_time?.slice(0,5)} - {itm.properties.lunch_end_time?.slice(0,5)}
          </span>
        ),
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
