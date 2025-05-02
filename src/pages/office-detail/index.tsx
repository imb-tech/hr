import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import {
  ASSIGN_COMPANIES,
  HR_API,
  ROLES_STATISTIC,
} from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Selection } from "@react-types/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useHrListColsOffice } from "../hr/cols2";
import OfficeList from "./office-list";
import OfficeProfile from "./office-profile";
import PositionAccordion from "./position-accordion";
import PositonCard from "./positon-card";

export default function OfficeDetail() {
  const { id } = useParams({ from: "/_main/office/$id" });
  const { data: info } = useGet<OfficeInfo[]>(`${ROLES_STATISTIC}/${id}`, {
    options: { enabled: Boolean(id) },
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const { data: dataHr, isSuccess: successHr } = useGet<Human[]>(HR_API);

  const { mutate, isPending } = usePost({
    onSuccess: () => {
      addToast({
        title: "Muvaffaqiyatli",
        color: "success",
      });
      closeModal();
      queryClient.invalidateQueries({
        queryKey: [HR_API],
      });
    },
  });

  const columnsHr = useHrListColsOffice();

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      const allIds =
        successHr && dataHr?.length > 0
          ? dataHr?.map((item) => (item as any).id)
          : [];
      setSelectedIds(allIds);
    } else {
      const selected = Array.from(keys) as string[];
      setSelectedIds(selected);
    }
  };

  const addCompaniy = () => {
    mutate(ASSIGN_COMPANIES, {
      user_ids: selectedIds,
      company: id,
    });
  };

  useEffect(() => {
    if (id && successHr && dataHr.length > 0) {
      const matchingItems = dataHr.filter((item) => {
        const companiesContainId = item.companies?.includes(Number(id));
        return companiesContainId;
      });
      const matchingIds = matchingItems.map((item: any) => String(item.id));
      setSelectedIds(matchingIds);
    }
  }, [id, successHr, dataHr]);



  return (
    <div>
      <OfficeList />
      <OfficeProfile />

      <div className="lg:hidden grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 mt-5">
        {info?.map((item, index) => <PositonCard item={item} key={index} />)}
      </div>
      <PositionAccordion info={info} />

      <Modal size="4xl" title="Hodimlar ro'yxati">
        <DataTable
          shadow="none"
          selectedKeys={new Set(selectedIds)}
          selectionMode="multiple"
          isHeaderSticky
          columns={columnsHr}
          onSelectionChange={handleSelectionChange}
          data={successHr && dataHr.length > 0 ? dataHr : []}
        />
        <div className="flex justify-end">
          <Button
            onPress={addCompaniy}
            isLoading={isPending}
            disabled={isPending}
          >
            Saqlash
          </Button>
        </div>
      </Modal>
    </div>
  );
}
