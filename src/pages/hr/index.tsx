import DeleteModal from "@/components/elements/delete-modal";
import ParamPagination from "@/components/param/pagination";
import { ParamInputSearch } from "@/components/param/search-input";
import DataTable from "@/components/ui/table";
import { HR_API } from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { useGet } from "@/hooks/useGet";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useHrListCols } from "./cols";

export default function HrPage() {
  const { openModal } = useModal("delete");
  const navigate = useNavigate();
  const params = useSearch({ strict: false });
  const { data, isLoading, isSuccess } = useGet<ListResponse<Human>>(HR_API, {
    params,
  });
  const { store, setStore } = useStore<Human>("hr-data");

  function handleDelete(item: Human) {
    if (!item.id) return;
    openModal();
    setStore(item);
  }

  return (
    <div>
      <ParamInputSearch className="mb-3" />
      <DataTable
        isLoading={isLoading}
        columns={useHrListCols()}
        data={data?.results || []}
        onDelete={(item) => handleDelete(item)}
        onEdit={(item) => {
          if (!item.id) return;
          navigate({ to: `/hr-edit/${item.id}` });
        }}
        onRowClick={(item) => navigate({ to: `/hr-view/${item.id}` })}
      />
      {isSuccess && data?.total_pages > 1 ? (
        <ParamPagination total={data?.total_pages ?? 0} />
      ) : null}
      <DeleteModal id={store?.id} path={HR_API} />
    </div>
  );
}
