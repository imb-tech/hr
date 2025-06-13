import { ColumnDef } from "@/components/ui/table";
import { formatMoney } from "@/lib/format-money";
import { useMemo } from "react";
import { monthKeys } from "../hr-details/month-accordion";

export const useHistoryCols = () => {
  return useMemo<ColumnDef<PlanHistory>[]>(
    () => [
      {
        header: "Tarif",
        dataKey: "plan",
      },
      {
        header: "Narxi",
        dataKey: "amount",
        cell(value) {
          return <p>{formatMoney(value)} so'm</p>;
        },
      },
      {
        header: "Sana",
        dataKey: "month",
        cell(_, item) {
          return (
            <p>
              {monthKeys[item.month]}, {item.year}
            </p>
          );
        },
      },
      {
        header: " ",
        dataKey: "actions",
      },
    ],
    [],
  );
};
