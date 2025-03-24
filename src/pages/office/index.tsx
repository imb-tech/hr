import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { usOfficeCols } from "./cols";
import CreateOfficeForm from "./create-office-form";

const data: Office[] = [
  {
    id: 1,
    name: "IMB Holding",
    address: "Tashkent Index, 3R",
    work_time: "09:00 - 18:00",
    users: 32,
  },
];

export default function OfficePage() {
  const { openModal } = useModal("delete");

  return (
    <div>
      <DataTable
        columns={usOfficeCols()}
        data={data}
        onDelete={openModal}
        onEdit={(item) => console.log(item)}
      />

      <DeleteModal id={1} path="ddd" queryKey="office" />

      <Modal size="3xl" title="Ofis qo'shish">
        <CreateOfficeForm />
      </Modal>
    </div>
  );
}
