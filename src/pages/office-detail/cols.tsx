import { ColumnDef } from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { MessageCircle } from "lucide-react";
import { useMemo } from "react";
 
export const useWorkerInfoCols = () => {
  const { openModal } = useModal();
  return useMemo<ColumnDef<WorkerInfo>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "FIO", dataKey: "full_name" },
      { header: "Kelish vaqti", dataKey: "entrance_time" },
      { header: "Ketish vaqti", dataKey: "check_out_time" },
      { header: "Kechikish vaqti", dataKey: "latency" },
      { header: "Erta ketish vaqti", dataKey: "check_out_time" },
      { header: "Ishxonadagi vaqti", dataKey: "entrance_time" },
      {
        header: "Status",
        dataKey: "last_company",
        cell(_, item) {
          return (
            <div className="flex items-center gap-4">
              <span>
                {item.last_company === null ? "Ofisdan tashqarida" : "Ofisda"}
              </span>
              <span
                onClick={openModal}
                className="cursor-pointer hover:text-primary"
              >
                <MessageCircle width={18} />
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );
};
