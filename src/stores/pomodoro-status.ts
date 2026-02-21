import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type PomodoroStatusState = {
  isRunning: boolean;
  focusCount: number;
  currentPhase: "focus" | "break" | "longBreak";
};

const initialState: PomodoroStatusState = {
  isRunning: false,
  focusCount: 0,
  currentPhase: "focus",
};

const usePomodoroStatus = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setIsRunning: (isRunning: boolean) => set({ isRunning: isRunning }),
        setFocusCount: (count: number) => set({ focusCount: count }),
        setCurrentPhase: (phase: "focus" | "break" | "longBreak") =>
          set({ currentPhase: phase }),
        reset: () => set(initialState),
      },
    })),
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
