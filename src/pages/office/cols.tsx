import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const usOfficeCols = () => {
  return useMemo<ColumnDef<Office>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "Nomi", dataKey: "name" },
      { header: "Manzil", dataKey: "address" },
      { header: "Hodimlar soni", dataKey: "users" },
      { header: "Tushlik boshlanish", dataKey: "lunch_start_time" },
      { header: "Tushlik tugash", dataKey: "lunch_end_time" },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
