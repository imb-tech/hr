import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usOfficeCols = () => {
  return useMemo<ColumnDef<Office>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      {
        header: "Nomi",
        dataKey: "properties",
        cell: (_, item) => <span>{item.properties.name}</span>,
      },
      {
        header: "Manzil",
        dataKey: "properties",
        cell: (_, item) => <span>{item.properties.address}</span>,
      },
      {
        header: "Hodimlar soni",
        dataKey: "id",
      },
      {
        header: "Tushlik boshlanish",
        dataKey: "properties",
        cell: (_, item) => <span>{item.properties.lunch_start_time}</span>,
      },
      {
        header: "Tushlik tugash",
        dataKey: "properties",
        cell: (_, item) => <span>{item.properties.lunch_end_time}</span>,
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
