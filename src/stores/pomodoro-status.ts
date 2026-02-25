import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type PomodoroStatusState = {
  currentSeconds: number;
  isRunning: boolean;
  focusCount: number;
  currentPhase: "focus" | "break" | "longBreak";
};

type PomodoroStatusStore = PomodoroStatusState & {
  actions: {
    setCurrentSeconds: (seconds: number) => void;
    setIsRunning: (isRunning: boolean) => void;
    setFocusCount: (count: number) => void;
    setCurrentPhase: (phase: "focus" | "break" | "longBreak") => void;
    reset: () => void;
  };
};

const initialState: PomodoroStatusState = {
  currentSeconds: 0,
  isRunning: false,
  focusCount: 0,
  currentPhase: "focus",
};

const usePomodoroStatus = create<PomodoroStatusStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        actions: {
          setCurrentSeconds: (seconds: number) =>
            set({ currentSeconds: seconds }),
          setIsRunning: (isRunning: boolean) => set({ isRunning }),
          setFocusCount: (count: number) => set({ focusCount: count }),
          setCurrentPhase: (phase: "focus" | "break" | "longBreak") =>
            set({ currentPhase: phase }),
          reset: () => set({ ...initialState }),
        },
      }),
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

export const useIsRunning = () =>
  usePomodoroStatus((state) => state.isRunning);

export const useResetPomodoroStatus = () =>
  usePomodoroStatus((state) => state.actions.reset);

export const usePomodoroStateStore = () => usePomodoroStatus();
