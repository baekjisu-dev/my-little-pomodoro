import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type PomodoroStatusState = {
  isRunning: boolean;
  currentPhase: "focus" | "break" | "longBreak";
};

const initialState: PomodoroStatusState = {
  isRunning: false,
  currentPhase: "focus",
};

const usePomodoroStatus = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setIsRunning: (isRunning: boolean) => set({ isRunning: isRunning }),
        setCurrentPhase: (phase: "focus" | "break" | "longBreak") =>
          set({ currentPhase: phase }),
      },
    })),
    { name: "pomodoro-status" },
  ),
);

export const useIsRunning = () => {
  const isRunning = usePomodoroStatus((state) => state.isRunning);

  return isRunning;
};

export const usePomodoroStateStore = () => {
  const store = usePomodoroStatus();

  return store as typeof store & PomodoroStatusState;
};
