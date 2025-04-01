import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usOfficeCols } from "./cols";
import CreateOfficeForm from "./create-office-form";

export default function OfficePage() {
  const { openModal } = useModal("delete");
  const { openModal: openEdit } = useModal();
  const { setStore } = useStore("office-data");
  const navigate = useNavigate();
  const [isLoading, seIsLoading] = useState(true);

  // const { data: companies, isLoading } = useGet(COMPANIES);

  const companies: Office[] = [
    {
      id: 1,
      name: "IMB Holding",
      users: 42,
      address: "Tashkent Index, 3R",
      lunch_start_time: "12:00",
      lunch_end_time: "13:00",
      location: {
        coordinates: [45.4134, 62.99231],
      },
      polygon: {
        coordinates: [],
      },
    },
  ];

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

  useEffect(() => {
    setTimeout(() => {
      seIsLoading(false);
    }, 300);
  }, []);

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
