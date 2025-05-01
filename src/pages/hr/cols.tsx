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
        dataKey: "middle_name",

        cell: (_, item) => {
          return (
            <span className="whitespace-nowrap lg:break-all">
              {item.first_name} {item.last_name} {item.middle_name}
            </span>
          );
        },
      },
      {
        header: "Telefon",
        dataKey: "phone_number",
        cell: (value) => {
          return (
            <span className="whitespace-nowrap lg:break-all">
              {formatPhoneNumber(Number(value))}
            </span>
          );
        },
      },
      {
        header: "Lavozim",
        dataKey: "education",
        cell: (_, item) => {
          return (
            <span className="whitespace-nowrap lg:break-all">
              {item.groups?.[0]?.name}
            </span>
          );
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
