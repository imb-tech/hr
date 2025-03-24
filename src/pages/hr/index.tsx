import DataTable from "@/components/ui/table";
import { useHrListCols } from "./cols";

export default function HrPage() {
  return (
    <div>
      <DataTable isHeaderSticky columns={useHrListCols()} data={[]} />
    </div>
  );
}
