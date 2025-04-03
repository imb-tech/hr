import { ColumnDef } from "@/components/ui/table";
import formatPhoneNumber from "@/lib/formatter-phone";
import { useMemo } from "react";

export const useHrListCols = () => {
  return useMemo<ColumnDef<Human>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "FIO", dataKey: "full_name" },
      {
        header: "Telefon",
        dataKey: "phone_number",
        cell: (value) => {
          return formatPhoneNumber(Number(value));
        },
      },
      {
        header: "Qo'shimcha raqam",
        dataKey: "phone_number2",
        cell: (value) => {
          return formatPhoneNumber(Number(value));
        },
      },
      {
        header: "Maosh",
        dataKey: "salary",
        cell: (salary) => {
          if (typeof salary === "number") {
            return salary.toLocaleString();
          }
          return salary;
        },
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
