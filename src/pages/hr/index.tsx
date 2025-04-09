import DeleteModal from "@/components/elements/delete-modal";
import DataTable from "@/components/ui/table";
import { HR_API } from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { useGet } from "@/hooks/useGet";
import { useNavigate } from "@tanstack/react-router";
import { useHrListCols } from "./cols";

export default function HrPage() {
  const { openModal } = useModal("delete");
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useGet<Human[]>(HR_API);
  const { store, setStore } = useStore<Human>("hr-data");

  function handleDelete(item: Human) {
    if (!item.id) return;
    openModal();
    setStore(item);
  }

  return (
    <div>
      <DataTable
        isLoading={isLoading}
        isHeaderSticky
        columns={useHrListCols()}
        data={(isSuccess && data) || []}
        onDelete={(item) => handleDelete(item)}
        onEdit={(item) => {
          if (!item.id) return;
          navigate({ to: `/hr-edit/${item.id}` });
        }}
        onRowClick={(item) => navigate({ to: `/hr-view/${item.id}` })}
      />
      <DeleteModal id={store?.id} path={HR_API} />
    </div>
  );
}
