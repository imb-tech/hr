import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { POSITION } from "@/lib/api-endpoints";
import { useState } from "react";
import { usPostionsCols } from "./cols";
import CreatePositionsForm from "./create-position-form";

export default function PostionsPage() {
  const { openModal: openDeleteModal } = useModal("delete");
  const { openModal: openUpdateModal } = useModal();
  const [dataItem, setDataItem] = useState<Position>();
  const [deleteID, setDeleteID] = useState<number>(0);

  const data: Position[] = [
    {
      id: 1,
      poisiton: "Frontend developer",
      start_date: "09:00",
      end_date: "18:00",
    },
  ];

  function handleItem(item: Position) {
    if (!item.id) return;
    setDataItem(item);
    openUpdateModal();
  }

  function handleDelete(id: number) {
    if (id) {
      openDeleteModal();
      setDeleteID(id);
    }
  }

  return (
    <div>
      <DataTable
        columns={usPostionsCols()}
        data={data}
        onEdit={(item) => handleItem(item)}
        onDelete={(item) => handleDelete(item.id)}
      />
      <DeleteModal id={deleteID} path="ddd" queryKey={POSITION} />
      <Modal size="3xl" title="Lavozim qo'shish">
        <CreatePositionsForm dataItem={dataItem} />
      </Modal>
    </div>
  );
}
