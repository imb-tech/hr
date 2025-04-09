import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const useWorkerInfoCols = () => {
  return useMemo<ColumnDef<WorkerInfo>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "FIO", dataKey: "full_name" },
      { header: "Kelish vaqt", dataKey: "entrance_time" },
      { header: "Kechikish", dataKey: "latency" },
      { header: "Ish vaqti", dataKey: "entrance_time" },
      { header: "Ketish vaqti", dataKey: "check_out_time" },
      {
        header: "Hozir qayerda",
        dataKey: "last_company",
        cell(_, item) {
          return (
            <span>
              {item.last_company === null ? "Ofisdan tashqarida" : "Ofisda"}
            </span>
          );
        },
      },
      { header: "Erta ketish", dataKey: "check_out_time" },
    ],
    [],
  );
};
