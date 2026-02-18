import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type TagAddModalState = {
  isOpen: boolean;
};

const initialState: TagAddModalState = {
  isOpen: false,
};

const useTagAddModal = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "tag-add-modal" }
  )
);

export const useOpenTagAddModal = () =>
  useTagAddModal((state) => state.actions.open);

export const useCloseTagAddModal = () =>
  useTagAddModal((state) => state.actions.close);

export const useTagAddModalStore = () => useTagAddModal();
