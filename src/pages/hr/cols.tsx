import { ColumnDef } from "@/components/ui/table";
import { formatMoney } from "@/lib/format-money";
import formatPhoneNumber from "@/lib/formatter-phone";
import { useMemo } from "react";

export const useHrListCols = () => {
  return useMemo<ColumnDef<Human>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      {
        header: "FIO",
        dataKey: "full_name",

        cell: (_, item) => {
          return (
            <span>
              {item.first_name} {item.last_name} {item.full_name}
            </span>
          );
        },
      },
      {
        header: "Telefon",
        dataKey: "phone_number",
        cell: (value) => {
          return formatPhoneNumber(Number(value));
        },
      },
      {
        header: "Lavozim",
        dataKey: "education",
        cell: (_, item) => {
          return item.groups?.[0]?.name;
        },
      },
      {
        header: "Maosh",
        dataKey: "salary",
        cell: (salary) => {
          return formatMoney(Number(salary));
        },
      },
      { header: "Amallar", dataKey: "actions" },
    ],
    [],
  );
};
