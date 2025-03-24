import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import CreateOfficeForm from "./create-office-form";
import { usPostionsCols } from "./cols";

export default function PostionsPage() {
  const data: Positon[] = [
    {
      id: 1,
      positon: "Frontend de",
      work_time: "09:00 - 18:00",
    },
  ];

  return (
    <div>
      <DataTable columns={usPostionsCols()} data={data} />

      <Modal size="3xl" title="Lavozim qo'shish">
        <CreateOfficeForm />
      </Modal>
    </div>
  );
}
