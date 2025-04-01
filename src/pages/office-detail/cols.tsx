import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const useWorkerInfoCols = () => {
  return useMemo<ColumnDef<WorkerInfo>[]>(
    () => [
      { header: "ID", dataKey: "id", sortable: true },
      { header: "FIO", dataKey: "full_name", sortable: true },
      { header: "Ish vaqti", dataKey: "work_duration", sortable: true },
      { header: "Kelish vaqt", dataKey: "coming_time", sortable: true },
      { header: "Ketish vaqti", dataKey: "left_time", sortable: true },
      { header: "Kechikish", dataKey: "lating_time", sortable: true },
      { header: "Erta ketish", dataKey: "early_left", sortable: true },
      { header: "Hozir qayerda", dataKey: "live_location", sortable: true },
    ],
    [],
  );
};
