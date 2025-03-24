import { useModalStore } from "@/store/modal";
import { useCallback } from "react";

export function useModal(modalKey = "default") {
  const { openModals, openModal, closeModal } = useModalStore();

  const isOpen = !!openModals[modalKey]; // Modal ochiq yoki yo'qligini tekshirish

  // Funksiyalarni qaytarish
  const open = useCallback(() => openModal(modalKey), [modalKey, openModal]);
  const close = useCallback(() => closeModal(modalKey), [modalKey, closeModal]);

  return { isOpen, openModal: open, closeModal: close };
}
