import {
  DEFAULT_BREAK_TIME,
  DEFAULT_FOCUS_TIME,
  DEFAULT_LONG_BREAK_TIME,
} from "@/lib/constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type PomodoroSettingsState = {
  selectedTag: string;
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
};

type PomodoroSettingsStore = PomodoroSettingsState & {
  actions: {
    setSelectedTag: (tag: string) => void;
    setFocusTime: (time: number) => void;
    setBreakTime: (time: number) => void;
    setLongBreakTime: (time: number) => void;
  };
};

const initialState: PomodoroSettingsState = {
  selectedTag: "집중",
  focusTime: DEFAULT_FOCUS_TIME,
  breakTime: DEFAULT_BREAK_TIME,
  longBreakTime: DEFAULT_LONG_BREAK_TIME,
};

const usePomodoroSettings = create<PomodoroSettingsStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        actions: {
          setSelectedTag: (tag: string) => set({ selectedTag: tag }),
          setFocusTime: (time: number) => set({ focusTime: time }),
          setBreakTime: (time: number) => set({ breakTime: time }),
          setLongBreakTime: (time: number) => set({ longBreakTime: time }),
        },
      }),
      {
        name: "pomodoro-settings",
        partialize: (state) => ({
          selectedTag: state.selectedTag,
          focusTime: state.focusTime,
          breakTime: state.breakTime,
          longBreakTime: state.longBreakTime,
        }),
      },
    ),
  ),
);

export const useSelectedTag = () =>
  usePomodoroSettings((state) => state.selectedTag);

export const useSetSelectedTag = () =>
  usePomodoroSettings((state) => state.actions.setSelectedTag);

export const usePomodoroSettingsStore = () => usePomodoroSettings();
