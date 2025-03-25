import DeleteModal from "@/components/elements/delete-modal";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal";
import { useHrListCols } from "./cols";
import CreateHrForm from "./create-hr-form";

export default function HrPage() {
  const { openModal } = useModal("delete");
  const data: Human[] = [
    {
      id: 1,
      full_name: "ozodbek",
      phone: "+998 93 102 30 42",
      family_phone: ["+998 88 102 30 42"],
      address: "Tashkent, 123 Street",
      location: "Tashkent, Uzbekistan",
      id_card: "1234567890",
      education: "Bachelor of Science",
      salary: 50000,
    },
  ];

  return (
    <div>
      <DataTable
        isHeaderSticky
        columns={useHrListCols()}
        data={data}
        onDelete={openModal}
        onEdit={(item) => console.log(item)}
        onRowClick={(item) => console.log(item)}
      />
      <DeleteModal id={1} path="ddd" queryKey="employess" />
      <Modal size="3xl" title="Xodim qo'shish">
        <CreateHrForm />
      </Modal>
    </div>
  );
}
