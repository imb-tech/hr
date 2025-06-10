import PopoverImage from "@/components/elements/popover-image";
import { ColumnDef } from "@/components/ui/table";
import { formatMoney } from "@/lib/format-money";
import formatPassportNumber from "@/lib/formatter-pasport";
import formatPhoneNumber from "@/lib/formatter-phone";
import { cn } from "@heroui/theme";
import { useMemo } from "react";

export const useAbsentListCols = () => {
  return useMemo<ColumnDef<Human>[]>(
    () => [
      {
        header: "Rasm",
        dataKey: "face",
        cell: (value) => {
          return (
            <div className="max-w-8">
              <PopoverImage image={value} />
            </div>
          );
        },
      },
      {
        header: "FIO",
        dataKey: "full_name",
      },
      {
        header: "Telefon",
        dataKey: "phone",
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
        dataKey: "role_name",
      },
      {
        header: "Ish vaqti",
        dataKey: "work_shift_start",
        cell: (_, item) => {
          return (
            <span className="whitespace-nowrap lg:break-all">
              {item?.work_shift_start?.slice(0, 5)} -{" "}
              {item?.work_shift_end?.slice(0, 5)}
            </span>
          );
        },
      },
      { header: "Manzil", dataKey: "address" },
      {
        header: "Pasport",
        dataKey: "id_number",
        cell: (value) => {
          return (
            <span className="whitespace-nowrap">
              {value ? formatPassportNumber(value) : "-"}
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
      {
        header: "Status",
        dataKey: "excuses_status",
        cell: (value) => {
          return (
            <div className="flex justify-center items-center">
              <span
                className={cn(
                  "text-center",
                  value == 1 ? "text-orange-400 " : "text-red-500 ",
                )}
              >
                {value == 1 ? "Sababli" : "Sababsiz"}
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );
};
