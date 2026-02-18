import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

type PomodoroSettingsState = {
  selectedTag: string;
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
};

const initialState: PomodoroSettingsState = {
  selectedTag: "집중",
  focusTime: 25,
  breakTime: 5,
  longBreakTime: 15,
};

const usePomodoroSettings = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setSelectedTag: (tag: string) => set({ selectedTag: tag }),
          setFocusTime: (time: number) => set({ focusTime: time }),
          setBreakTime: (time: number) => set({ breakTime: time }),
          setLongBreakTime: (time: number) => set({ longBreakTime: time }),
        },
      })),
      {
        name: "pomodoro-settings",
        partialize: (state) => ({
          selectedTag: state.selectedTag,
          focusTime: state.focusTime,
          breakTime: state.breakTime,
          longBreakTime: state.longBreakTime,
        }),
      }
    )
  )
);

export const useSelectedTag = () =>
  usePomodoroSettings((state) => state.selectedTag);

export const useSetSelectedTag = () =>
  usePomodoroSettings((state) => state.actions.setSelectedTag);
