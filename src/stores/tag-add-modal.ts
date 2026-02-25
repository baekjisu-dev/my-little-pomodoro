import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TagAddModalState = {
  isOpen: boolean;
};

type TagAddModalStore = TagAddModalState & {
  actions: {
    open: () => void;
    close: () => void;
  };
};

const initialState: TagAddModalState = {
  isOpen: false,
};

const useTagAddModal = create<TagAddModalStore>()(
  devtools(
    (set) => ({
      ...initialState,
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    }),
    { name: "tag-add-modal" },
  ),
);

export const useOpenTagAddModal = () =>
  useTagAddModal((state) => state.actions.open);

export const useCloseTagAddModal = () =>
  useTagAddModal((state) => state.actions.close);

export const useTagAddModalStore = () => useTagAddModal();
