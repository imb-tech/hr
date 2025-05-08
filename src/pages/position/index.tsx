import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { POSITION } from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { useGet } from "@/hooks/useGet";
import { usPostionsCols } from "./cols";
import CreatePositionsForm from "./create-position-form";

export default function PostionsPage() {
  const { openModal: openDeleteModal } = useModal("delete");
  const { openModal: openUpdateModal } = useModal();
  const { data, isSuccess, isLoading } = useGet<Position[]>(POSITION);
  const { store, setStore } = useStore<Position>("position-data");

  function handleItem(item: Position) {
    if (!item.id) return;
    setStore(item);
    openUpdateModal();
  }

  function handleDelete(item: Position) {
    if (item) {
      openDeleteModal();
      setStore(item);
    }
  }

  return (
    <div>
      <DataTable
        isLoading={isLoading}
        columns={usPostionsCols()}
        data={(isSuccess && data) || []}
        onEdit={(item) => handleItem(item)}
        onDelete={(item) => handleDelete(item)}
      />
      <DeleteModal id={store?.id} path={POSITION} />
      <Modal
        size="3xl"
        title={store?.id ? "Lavozim tahrirlash" : "Lavozim qo'shish"}
      >
        <CreatePositionsForm dataItem={store} />
      </Modal>
    </div>
  );
}
