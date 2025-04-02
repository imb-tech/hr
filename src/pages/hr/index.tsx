import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { HR_API } from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useHrListCols } from "./cols";
import CreateHrForm from "./create-hr-form";
// import { useGet } from "@/hooks/useGet";

export default function HrPage() {
  const { openModal } = useModal("delete");
  const [deleteID, setDeleteID] = useState<number>(0);
  const navigate = useNavigate();
  // const { data: data2 } = useGet(HR_API);

  const data: Human[] = [
    {
      id: 1,
      full_name: "Ozodbek Abdisamatov",
      phone: "+998 93 102 30 42",
      family_phone: "+998 88 102 30 42",
      address: "Tashkent, 123 Street",
      location: "Tashkent, Uzbekistan",
      id_card: "1234567890",
      education: "Bachelor of Science",
      salary: 50000,
      positon: "P. Manager",
    },
  ];

  function handleDelete(id: number) {
    if (!id) return;
    openModal();
    setDeleteID(id);
  }


  return (
    <div>
      <DataTable
        isHeaderSticky
        columns={useHrListCols()}
        data={data}
        onDelete={(item) => handleDelete(item.id)}
        onEdit={(item) => {
          if (!item.id) return;
          navigate({ to: `/hr-edit/$${item.id}` });
        }}
        onRowClick={(item) => navigate({ to: `/hr-view/${item.id}` })}
      />
      <DeleteModal id={deleteID} path={HR_API} queryKey={HR_API} />
      <Modal size="3xl" title="Xodim qo'shish">
        <CreateHrForm />
      </Modal>
    </div>
  );
}
