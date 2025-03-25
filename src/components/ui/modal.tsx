import { useModal } from "@/hooks/use-modal";
import { Button } from "@heroui/button";
import {
  Modal as HeroModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/modal";

type Props = {
  modalKey?: string;
  title?: string;
  showFooter?: boolean;
};

export default function Modal({
  modalKey = "default",
  title,
  children,
  showFooter = false,
  ...props
}: Props & ModalProps) {
  const { closeModal, isOpen } = useModal(modalKey);

  return (
    <HeroModal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={closeModal}
      {...props}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            {isOpen && <ModalBody>{children}</ModalBody>}
            {showFooter && (
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Orqaga
                </Button>
                <Button color="primary" type="submit">
                  Saqlash
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
}
