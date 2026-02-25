import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Pomodoro, TagCounts } from "../../types";
import { isSameDay } from "date-fns";
import {
  computeTagCounts,
  get30DayView,
  pruneOldHistory,
  toDateString,
} from "@/lib/history";

type PomodoroHistoryState = {
  todayPomodoros: Pomodoro[];
  pomodoroHistory30Days: Record<string, TagCounts>;
};

type PomodoroHistoryActions = {
  actions: {
    addPomodoro: (pomodoro: Pomodoro) => void;
    flushTodayToHistory: () => void;
    reset: () => void;
  };
};

type PomodoroHistoryStore = PomodoroHistoryState & PomodoroHistoryActions;

const initialState: PomodoroHistoryState = {
  todayPomodoros: [],
  pomodoroHistory30Days: {},
};

const usePomodoroHistory = create<PomodoroHistoryStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        actions: {
          addPomodoro: (pomodoro: Pomodoro) => {
            const { todayPomodoros, actions } = get();
            const lastPomodoro = todayPomodoros[todayPomodoros.length - 1];

            if (
              lastPomodoro &&
              !isSameDay(new Date(lastPomodoro.createdAt), new Date())
            ) {
              actions.flushTodayToHistory();
            }

            set((state) => ({
              todayPomodoros: [...state.todayPomodoros, pomodoro],
            }));
          },
          flushTodayToHistory: () => {
            const { todayPomodoros, pomodoroHistory30Days } = get();
            if (todayPomodoros.length === 0) return;

            const lastPomodoro = todayPomodoros[todayPomodoros.length - 1];
            const dateStr = toDateString(new Date(lastPomodoro.createdAt));
            const tagCounts = computeTagCounts(todayPomodoros);

            const updatedHistory = pruneOldHistory({
              ...pomodoroHistory30Days,
              [dateStr]: tagCounts,
            });

            set({ todayPomodoros: [], pomodoroHistory30Days: updatedHistory });
          },
          reset: () => set({ ...initialState }),
        },
      }),
      {
        name: "pomodoro-history",
        partialize: (state) => ({
          todayPomodoros: state.todayPomodoros,
          pomodoroHistory30Days: state.pomodoroHistory30Days,
        }),
        onRehydrateStorage: () => (state) => {
          if (!state) return;

          const { todayPomodoros, actions } = state;
          const lastPomodoro = todayPomodoros[todayPomodoros.length - 1];

          if (!lastPomodoro) return;

          if (!isSameDay(new Date(lastPomodoro.createdAt), new Date())) {
            actions.flushTodayToHistory();
          }
        },
      },
    ),
    { name: "pomodoro-history" },
  ),
);

export const useAddPomodoro = () => {
  return usePomodoroHistory((state) => state.actions.addPomodoro);
};

export const useTodayPomodoros = () => {
  return usePomodoroHistory((state) => state.todayPomodoros);
};

export const usePomodoroHistory30Days = () => {
  const pomodoroHistory = usePomodoroHistory(
    (state) => state.pomodoroHistory30Days,
  );

  return get30DayView(pomodoroHistory);
};

export const usePomodoroHistoryStore = () => {
  return usePomodoroHistory();
};
