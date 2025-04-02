import { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

export const useWorkerInfoCols = () => {
  return useMemo<ColumnDef<WorkerInfo>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "FIO", dataKey: "full_name" },
      { header: "Kelish vaqt", dataKey: "coming_time" },
      { header: "Kechikish", dataKey: "lating_time" },
      { header: "Ish vaqti", dataKey: "work_duration" },
      { header: "Ketish vaqti", dataKey: "left_time" },
      { header: "Hozir qayerda", dataKey: "live_location" },
      { header: "Erta ketish", dataKey: "early_left" },
    ],
    [],
  );
};
