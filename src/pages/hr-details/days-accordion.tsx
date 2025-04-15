import Accordion from "@/components/ui/accordion";
import Modal from "@/components/ui/modal";
import { USER_YEAR_TOTAL_MONTH_DAYS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Selection } from "@react-types/shared";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import DaysTableHeader from "./days-header";
import OneDaysAccordion from "./one-day-statistic";
import { formatDateTime } from "@/lib/format-date";

export default function DaysAccordion() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_main/hr-view/$id" });
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const search = useSearch({ strict: false });
  const { data: info } = useGet<HumanYear[]>(
    `${USER_YEAR_TOTAL_MONTH_DAYS}/${id}`,
    {
      params: search,
      options:{
        enabled: Boolean((search as any)?.month)
      }
    },
  );

  function clickAccordion(keys: Selection) {
    const selected = Array.from(keys).filter(Boolean) as string[];
    setSelectedKeys(new Set(selected));

    navigate({
      to: "/hr-view/$id",
      params: { id },
      search: (prev) => ({
        ...prev,
        day: selected.join(","),
      }),
    });
  }

  return (
    <div>
      <Accordion
        selectionMode="single"
        variant="light"
        style={{
          padding: "0",
        }}
        items={[
          {
            key: "2",
            title: <DaysTableHeader />,
            content: "hidden",
          },
        ]}
        itemProps={{
          classNames: {
            content: "hidden",
            indicator: "hidden",
            trigger: "!p-0 !px-0",
          },
        }}
      />
      <Accordion
        style={{
          padding: "0",
        }}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={clickAccordion}
        items={info?.map((item) => ({
          key: item.id.toString(),
          title: (
            <div className="grid grid-cols-7 gap-11 rounded-b-lg">
              <p className="text-sm">{item.id > 9 ? item.id : "0" + item.id}</p>
              <p className="text-sm">{formatDateTime(item?.attendance_time)}</p>
              <p className="text-sm">0</p>
              <p className="text-sm">{item?.shift_start_time}</p>
              <p className="text-sm">{item?.shift_end_time}</p>
              <p className="text-sm">{formatDateTime(item.left_time)}</p>
              <p className="text-sm">{item.status || "Kech qolgan"}</p>
            </div>
          ),
          content: (
            <div className="pl-6  ">
              <OneDaysAccordion />
              <Modal>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        So'rov tafsiloti
                      </ModalHeader>
                      <ModalBody>
                        <Textarea
                          isReadOnly
                          className="w-full"
                          label="Sabab"
                          labelPlacement="outside"
                          placeholder="Sabab..."
                          variant="flat"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Rad etish
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Qabul qilish
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          ),
        }))}
        itemProps={{ classNames: { trigger: "p-3 dark:bg-neutral-900 " } }}
      />
    </div>
  );
}
