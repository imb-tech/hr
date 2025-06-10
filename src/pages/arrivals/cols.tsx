import PopoverImage from "@/components/elements/popover-image";
import { ColumnDef } from "@/components/ui/table";
import { formatMoney } from "@/lib/format-money";
import formatPassportNumber from "@/lib/formatter-pasport";
import formatPhoneNumber from "@/lib/formatter-phone";
import { cn } from "@heroui/theme";
import { format } from "date-fns";
import { useMemo } from "react";

export const useArrivalsListCols = () => {
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
        header: "Kelish va Ketish",
        dataKey: "id",
        cell: (_, item) => {
          return (
            <span className="whitespace-nowrap lg:break-all">
              {item.attendance_json?.attendance_time
                ? format(item.attendance_json?.attendance_time, "HH:mm")
                : "-"}{" "}
              -
              {item.attendance_json?.left_time
                ? format(item.attendance_json?.left_time, "HH:mm")
                : "-"}
            </span>
          );
        },
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
              {formatPassportNumber(value)}
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
        dataKey: "attendance_status",
        cell: (value) => {
          return (
            <div className="flex justify-center items-center">
              <span
                className={cn(
                  "text-center whitespace-nowrap",
                  value == 1 ? "text-green-400 " : "text-orange-300 ",
                )}
              >
                {value == 1 ? "Vaqtida kelgan" : "Kech qolgan"}
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );
};
