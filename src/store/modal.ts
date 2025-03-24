import { create } from "zustand";

type ModalState = {
  openModals: Record<string, boolean>; // Har bir modal uchun holat
  openModal: (modalKey: string) => void; // Modalni ochish
  closeModal: (modalKey: string) => void; // Modalni yopish
};

export const useModalStore = create<ModalState>((set) => ({
  openModals: {}, // Boshlang‘ich holat - hech qaysi modal ochiq emas
  openModal: (modalKey) =>
    set((state) => ({ openModals: { ...state.openModals, [modalKey]: true } })),
  closeModal: (modalKey) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalKey]: false },
    })),
}));
