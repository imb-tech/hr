import { useModal } from "@/hooks/use-modal";
import { Button } from "@heroui/button";
import { ModalFooter } from "@heroui/modal";
import Modal from "../ui/modal";

type Props = {
  modalKey?: string;
  path: string;
  id: number | string;
};

export default function DeleteModal({ modalKey = "delete" }: Props) {
  const { closeModal } = useModal(modalKey);

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
        <Button color="primary" type="submit" onPress={closeModal}>
          O'chirish
        </Button>
      </ModalFooter>
    </Modal>
  );
}
