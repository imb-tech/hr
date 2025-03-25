import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { useNavigate } from "@tanstack/react-router";
import { usOfficeCols } from "./cols";
import CreateOfficeForm from "./create-office-form";

const data: Office[] = [
  {
    id: 1,
    name: "IMB Holding",
    address: "Tashkent Index, 3R",
    lunch_start: "13:00",
    lunch_end: "14:00",
    users: 32,
  },
  {
    id: 2,
    name: "IMB Holding",
    address: "Tashkent Index, 3R",
    lunch_start: "13:00",
    lunch_end: "14:00",
    users: 32,
  },
];

export default function OfficePage() {
  const { openModal } = useModal("delete");
  const { openModal: openEdit } = useModal();
  const { setStore } = useStore("office-data");
  const navigate = useNavigate();

  function handleEdit(itm: Office) {
    setStore(itm);
    openEdit();
  }

  function onRowClick(itm: Office) {
    navigate({
      to: "/office/$id",
      params: {
        id: itm.id.toString(),
      },
    });
  }

  return (
    <div>
      <DataTable
        columns={usOfficeCols()}
        data={data}
        onDelete={openModal}
        onEdit={handleEdit}
        onRowClick={onRowClick}
      />

      <DeleteModal id={1} path="ddd" queryKey="office" />

      <Modal size="3xl" title="Ofis qo'shish">
        <CreateOfficeForm />
      </Modal>
    </div>
  );
}
