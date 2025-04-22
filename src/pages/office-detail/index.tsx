import Accordion from "@/components/ui/accordion";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import {
  ASSIGN_COMPANIES,
  HR_API,
  ROLES_STATISTIC,
  USER_STATISTIC,
} from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Selection } from "@react-types/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useHrListColsOffice } from "../hr/cols2";
import { useWorkerInfoCols } from "./cols";
import OfficeInfoRow from "./office-info-row";
import OfficeProfile from "./office-profile";
import OfficeDetailTableHeader from "./table-header";

export default function OfficeDetail() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/office/$id" });
  const search = useSearch({ from: "/_main/office/$id" });
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { data: info } = useGet<OfficeInfo[]>(`${ROLES_STATISTIC}`);
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

  const { data, isSuccess } = useGet<WorkerInfo[]>(
    `${USER_STATISTIC}/${search?.tab}/${id}`,
    {
      options: { enabled: Boolean(id) && Boolean(search?.tab) },
    },
  );

  function clickAccordion(keys: Selection) {
    const selectedIds = Array.from(keys)
      .map((key) => info?.[Number(key)]?.group_id)
      .filter(Boolean);

    setSelectedKeys(keys as Set<string>);

    navigate({
      to: "/office/$id",
      params: { id },
      search: {
        tab: selectedIds.join(","),
      },
    });
  }
  const columns = useWorkerInfoCols();
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
      <OfficeProfile />

      <Accordion
        selectionMode="single"
        variant="light"
        items={[
          {
            key: "1",
            title: <OfficeDetailTableHeader />,
            content: null,
          },
        ]}
        itemProps={{
          classNames: {
            content: "hidden",
            indicator: "opacity-0",
            trigger: "!pb-0",
          },
        }}
      />
      <Accordion
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={clickAccordion}
        items={info?.map((c, i) => ({
          key: i.toString(),
          title: <OfficeInfoRow data={c} />,
          content: (
            <div>
              <DataTable
                shadow="none"
                isHeaderSticky
                columns={columns}
                data={isSuccess && data.length > 0 ? data : []}
              />
            </div>
          ),
        }))}
        itemProps={{ classNames: { trigger: "!px-0 py-1" } }}
      />

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
