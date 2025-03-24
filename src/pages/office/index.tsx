import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { usOfficeCols } from "./cols";
import CreateOfficeForm from "./create-office-form";

export default function OfficePage() {
  const data: Office[] = [
    {
      id: 1,
      name: "IMB Holding",
      address: "Tashkent Index, 3R",
      work_time: "09:00 - 18:00",
      users: 32,
    },
  ];

  return (
    <div>
      <DataTable columns={usOfficeCols()} data={data} />

      <Modal size="3xl" title="Ofis qo'shish">
        <CreateOfficeForm />
      </Modal>
    </div>
  );
}
