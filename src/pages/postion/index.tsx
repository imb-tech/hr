import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { usPostionsCols } from "./cols";
import CreatePostionsForm from "./create-positon-form";

export default function PostionsPage() {
  const data: Positon[] = [
    {
      id: 1,
      positon: "Frontend developer",
      work_time: "09:00 - 18:00",
    },
  ];

  return (
    <div>
      <DataTable columns={usPostionsCols()} data={data} />

      <Modal size="3xl" title="Lavozim qo'shish">
        <CreatePostionsForm />
      </Modal>
    </div>
  );
}
