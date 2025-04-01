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
        dataKey: "phone",
        cell: (value) => {
          return formatPhoneNumber(value);
        },
      },
      {
        header: "Qo'shimcha raqam",
        dataKey: "family_phone",
        cell: (value) => {
          return formatPhoneNumber(value);
        },
      },
      {
        header: "Maosh",
        dataKey: "salary",
        cell: (salary) => {
          return salary.toLocaleString();
        },
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
