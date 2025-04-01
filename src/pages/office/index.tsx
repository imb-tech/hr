import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { COMPANIES } from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { useGet } from "@/services/default-requests";
import { useNavigate } from "@tanstack/react-router";
import { usOfficeCols } from "./cols";
import CreateOfficeForm from "./create-office-form";

export default function OfficePage() {
  const { openModal } = useModal("delete");
  const { openModal: openEdit } = useModal();
  const { setStore } = useStore("office-data");
  const navigate = useNavigate();

  const { data: companies, isLoading } = useGet(COMPANIES);

  console.log(companies);

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
        isLoading={isLoading}
        columns={usOfficeCols()}
        data={companies ?? []}
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
