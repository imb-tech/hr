import { create } from "zustand";

interface UsersStore {
    usersId: number[];
    setUsersId: (updater: (prev: number[]) => number[]) => void;
    addUserId: (id: number) => void;
    removeUserId: (id: number) => void;
    clearUsersId: () => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
    usersId: [],
    setUsersId: (updater) =>
        set((state) => ({
            usersId: updater(state.usersId),
        })),
    addUserId: (id) =>
        set((state) => ({
            usersId: state.usersId.includes(id)
                ? state.usersId
                : [...state.usersId, id],
        })),
    removeUserId: (id) =>
        set((state) => ({
            usersId: state.usersId.filter((uid) => uid !== id),
        })),
    clearUsersId: () => set({ usersId: [] }),
}));
