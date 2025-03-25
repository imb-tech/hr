import { create } from "zustand";

type Sidebar = {
  open: boolean;
  toggle: () => void;
};

export const useSidebarState = create<Sidebar>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
