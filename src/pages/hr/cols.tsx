import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const useHrListCols = () => {
  return useMemo<ColumnDef<Human>[]>(
    () => [
      { header: "ID", dataKey: "id", sortable: true },
      { header: "FIO", dataKey: "full_name", sortable: true },
      { header: "Tel", dataKey: "phone", sortable: true },
      { header: "Passport", dataKey: "id_card", sortable: true },
      { header: "Maosh", dataKey: "salary", sortable: true },
      { header: "Manzil", dataKey: "address", sortable: true },
      { header: "Yashash joy", dataKey: "location", sortable: true },
      { header: "Oila a'zolari", dataKey: "family_phone", sortable: true },
    ],
    [],
  );
};
