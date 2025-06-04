import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MonthStore {
  months: string[];
  setMonths: (updater: (prev: string[]) => string[]) => void;
  resetMonths: () => void;
}

const currentMonth = new Date().getMonth() + 1;
const formattedCurrent =
  currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

export const useMonthStore = create(
  persist<MonthStore>(
    (set) => ({
      months: [formattedCurrent],
      setMonths: (updater) => set((state) => ({ months: updater(state.months) })),
      resetMonths: () => set({ months: [formattedCurrent] }),
    }),
    {
      name: "month-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
