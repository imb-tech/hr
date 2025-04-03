import { useModal } from "@/hooks/use-modal";
import { Button } from "@heroui/button";
import { ModalFooter } from "@heroui/modal";

export default function ModalFormActions({
  modalKey = "default",
  isLoading = false,
}: {
  modalKey?: string;
  isLoading?: boolean;
}) {
  const { closeModal } = useModal(modalKey);

  return (
    <ModalFooter>
      <Button color="danger" variant="light" onPress={closeModal}>
        Orqaga
      </Button>
      <Button isLoading={isLoading} color="primary" type="submit">
        Saqlash
      </Button>
    </ModalFooter>
  );
}
