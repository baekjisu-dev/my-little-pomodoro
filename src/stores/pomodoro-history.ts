import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import type { Pomodoro } from "../../types";

type PomodoroHistoryState = {
  todayPomodoros: Pomodoro[];
  pomodoroHistory30Days: { [key: string]: number; all: number }[];
};

const initialState: PomodoroHistoryState = {
  todayPomodoros: [],
  pomodoroHistory30Days: [],
};

const usePomodoroHistory = create(
  devtools(
    persist(
      combine(initialState, (set, get) => ({
        actions: {
          addPomodoro: (pomodoro: Pomodoro) => {
            set({ todayPomodoros: [...get().todayPomodoros, pomodoro] });
          },
          addPomodoroToHistory30Days: (pomodoros: Pomodoro[]) => {
            const tagCounts: { [key: string]: number; all: number } = {
              all: 0,
            };

            for (const pomodoro of pomodoros) {
              tagCounts.all++;
              if (pomodoro.tag) {
                if (tagCounts[pomodoro.tag]) {
                  tagCounts[pomodoro.tag]++;
                } else {
                  tagCounts[pomodoro.tag] = 1;
                }
              }
            }

            const currentHistory = [...get().pomodoroHistory30Days];

            if (currentHistory.length >= 30) currentHistory.shift();

            currentHistory.push(tagCounts);

            console.log(currentHistory);

            set({ pomodoroHistory30Days: currentHistory });
          },
          resetTodayPomodoros: () => set({ todayPomodoros: [] }),
          reset: () => set({ ...initialState }),
        },
      })),
      {
        name: "pomodoro-history",
        partialize: (state) => ({
          todayPomodoros: state.todayPomodoros,
          pomodoroHistory30Days: state.pomodoroHistory30Days,
        }),
        onRehydrateStorage: () => (state) => {
          // TODO: 사용 중에 12시가 넘어갔을 때도 동일 로직 추가
          if (!state) return;

          const { todayPomodoros, actions } = state;

          const lastPomodoro = todayPomodoros[todayPomodoros.length - 1];

          if (!lastPomodoro) return;

          const lastDate = new Date(lastPomodoro.createdAt);
          const now = new Date();

          const isSameDay =
            lastDate.getFullYear() === now.getFullYear() &&
            lastDate.getMonth() === now.getMonth() &&
            lastDate.getDate() === now.getDate();

          if (isSameDay) {
            actions.addPomodoroToHistory30Days(todayPomodoros);
            actions.resetTodayPomodoros();
          }
        },
      },
    ),
    { name: "pomodoro-history" },
  ),
);

export const useAddPomodoro = () => {
  const addPomodoro = usePomodoroHistory((state) => state.actions.addPomodoro);

  return addPomodoro;
};

export const useTodayPomodoros = () => {
  const todayPomodoros = usePomodoroHistory((state) => state.todayPomodoros);

  return todayPomodoros;
};

export const usePomodoroHistory30Days = () => {
  const pomodoroHistory30Days = usePomodoroHistory(
    (state) => state.pomodoroHistory30Days,
  );

  return pomodoroHistory30Days;
};

export const usePomodoroHistoryStore = () => {
  const store = usePomodoroHistory();

  return store as typeof store & PomodoroHistoryState;
};
