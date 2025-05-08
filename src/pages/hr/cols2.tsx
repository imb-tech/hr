import { ColumnDef } from "@/components/ui/table";
import formatPhoneNumber from "@/lib/formatter-phone";
import { useMemo } from "react";

export const useHrListColsOffice = () => {
  return useMemo<ColumnDef<Human>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      {
        header: "FIO",
        dataKey: "middle_name",

        cell: (_, item) => {
          return (
            <span>
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
            <span className="whitespace-nowrap">
              {formatPhoneNumber(Number(value))}
            </span>
          );
        },
      },
      {
        header: "Lavozim",
        dataKey: "education",
      },
    ],
    [],
  );
};
