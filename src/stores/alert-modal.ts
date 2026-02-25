import { create } from "zustand";
import { devtools } from "zustand/middleware";

type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void;
  onNegative?: () => void;
};

type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

type AlertModalStore = State & {
  actions: {
    open: (params: Omit<OpenState, "isOpen">) => void;
    close: () => void;
  };
};

const useAlertModalStore = create<AlertModalStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      actions: {
        open: (params: Omit<OpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    }),
    { name: "AlertModalStore" },
  ),
);

export const useOpenAlertModal = () =>
  useAlertModalStore((store) => store.actions.open);

export const useAlertModal = () => useAlertModalStore();
