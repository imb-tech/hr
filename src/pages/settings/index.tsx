import ParamTabs from "@/components/param/tabs";
import Modal from "@/components/ui/modal";
import DataTable from "@/components/ui/table";
import { EXCUSE } from "@/constants/api-endpoints";
import { useStore } from "@/hooks/use-store";
import { useGet } from "@/hooks/useGet";
import { usePatch } from "@/hooks/usePatch";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { usSettingsCols } from "./cols";

const tabOptions = [
  { key: "0", label: "So'rovlar" },
  { key: "1", label: "Ruxsat berilganlar" },
  { key: "2", label: "Rad etilganlar" },
];

export default function SettingsPage() {
  const search = useSearch({ strict: false });

  const {
    data: data,
    isSuccess,
    isLoading,
  } = useGet<StatusType[]>(EXCUSE, { params: search });
  const { store } = useStore<StatusType>("status-data");
  const queryClient = useQueryClient();
  const { store: status } = useStore<{ status: number | string }>("status");
  const [comment, setComment] = useState("");

  const { mutate } = usePatch({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXCUSE],
      });
      status?.status === 2
        ? addToast({
            title: "Ruxsat berilmadi",
            color: "danger",
          })
        : addToast({
            title: "Muvaffaqiyatli ruxsat berildi",
            color: "success",
          });
    },
  });

  function updatesStatus() {
    if (status?.status === 2) {
      mutate(`${EXCUSE}/${store?.id}`, {
        status: status?.status,
        response_comment: comment,
      });
    } else {
      mutate(`${EXCUSE}/${store?.id}`, status);
    }
  }

  return (
    <div>
      <div className="mt-4">
      <ParamTabs tabs={tabOptions} paramName="status" clearOther={false} />
      </div>

      <DataTable
        isLoading={isLoading}
        columns={usSettingsCols()}
        data={(isSuccess && data) || []}
      />
      <Modal>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                {status?.status == 2 ? "Rad etilsinmi?" : "Ruxsat berilsinmi?"}
              </ModalHeader>
              {status?.status === 2 ? (
                <ModalBody>
                  <Textarea
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full"
                    label="Sabab"
                    labelPlacement="outside"
                    placeholder="Sabab..."
                    variant="flat"
                  />
                </ModalBody>
              ) : null}
              <ModalFooter>
                {status?.status === 2 ? (
                  <Button
                    disabled={Boolean(!comment)}
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      updatesStatus(), onClose();
                    }}
                  >
                    Rad etish
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onPress={() => {
                      updatesStatus(), onClose();
                    }}
                  >
                    Ruxsat berish
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
