import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

type PomodoroStatusState = {
  currentSeconds: number;
  isRunning: boolean;
  focusCount: number;
  currentPhase: "focus" | "break" | "longBreak";
};

const initialState: PomodoroStatusState = {
  currentSeconds: 0,
  isRunning: false,
  focusCount: 0,
  currentPhase: "focus",
};

const usePomodoroStatus = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setCurrentSeconds: (seconds: number) =>
            set({ currentSeconds: seconds }),
          setIsRunning: (isRunning: boolean) => set({ isRunning: isRunning }),
          setFocusCount: (count: number) => set({ focusCount: count }),
          setCurrentPhase: (phase: "focus" | "break" | "longBreak") =>
            set({ currentPhase: phase }),
          reset: () => set({ ...initialState }),
        },
      })),
      {
        name: "pomodoro-status",
        partialize: (state) => ({
          currentSeconds: state.currentSeconds,
          focusCount: state.focusCount,
          currentPhase: state.currentPhase,
        }),
      },
    ),
    { name: "pomodoro-status" },
  ),
);

export const useIsRunning = () => {
  const isRunning = usePomodoroStatus((state) => state.isRunning);

  return isRunning;
};

export const useResetPomodoroStatus = () => {
  const reset = usePomodoroStatus((state) => state.actions.reset);

  return reset;
};

export const usePomodoroStateStore = () => {
  const store = usePomodoroStatus();

  return store as typeof store & PomodoroStatusState;
};
