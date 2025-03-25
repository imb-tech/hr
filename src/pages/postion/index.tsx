import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";
import { usPostionsCols } from "./cols";
import CreatePostionsForm from "./create-positon-form";

export default function PostionsPage() {
  const { openModal: openDeleteModal } = useModal("delete");
  const { openModal: openUpdateModal } = useModal();
  const [dataItem, setDataItem] = useState<Positon>();

  const data: Positon[] = [
    {
      id: 1,
      positon: "Frontend developer",
      start_date: "09:00",
      end_date: "18:00",
    },
  ];

  function handleItem(item: Positon) {
    if (!item.id) return;
    setDataItem(item);
    openUpdateModal();
  }

  return (
    <div>
      <DataTable
        columns={usPostionsCols()}
        data={data}
        onDelete={openDeleteModal}
        onEdit={(item) => console.log(item)}
        onRowClick={(item) => handleItem(item)}
      />
      <DeleteModal id={1} path="ddd" queryKey="postion" />
      <Modal size="3xl" title="Lavozim qo'shish">
        <CreatePostionsForm dataItem={dataItem} />
      </Modal>
    </div>
  );
}
