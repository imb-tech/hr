import { useModal } from "@/hooks/use-modal";
import { Button } from "@heroui/button";
import { ModalFooter } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/modal";
import { useDelete } from "@/hooks/useDelete";

type Props = {
  modalKey?: string;
  path: string;
  id: number | string | undefined;
  queryKey?: string | string[];
};

export default function DeleteModal({
  modalKey = "delete",
  path,
  id,
  queryKey,
}: Props) {
  const { closeModal } = useModal(modalKey);
  const queryClient = useQueryClient();
  const resolvedQueryKey = queryKey ? (Array.isArray(queryKey) ? queryKey : [queryKey]) : [path];
  const { mutate } = useDelete({
    onSuccess: () => {
      addToast({
        description: "Muvaffaqiyatli o'chirildi",
        color: "success",
      });
      closeModal();
      queryClient.removeQueries({
        queryKey: resolvedQueryKey,
      });
    },
  });

  const handleDelete = () => {
    mutate(path + `/${id}`);
  };

  return (
    <Modal modalKey={modalKey}>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Rostdan ham o'chirmoqchimisiz</h2>
        <p className="text-default-400">
          Bu jarayonni orqaga qaytarib bo'lmaydi
        </p>
      </div>

      <ModalFooter className="px-0">
        <Button color="danger" variant="flat" onPress={closeModal}>
          Bekor qilish
        </Button>
        <Button color="primary" type="submit" onPress={handleDelete}>
          O'chirish
        </Button>
      </ModalFooter>
    </Modal>
  );
}
