import type { Pomodoro, TagCounts } from "types";

export const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const computeTagCounts = (pomodoros: Pomodoro[]): TagCounts => {
  const counts: TagCounts = { all: 0 };
  for (const pomodoro of pomodoros) {
    counts.all++;
    if (pomodoro.tag) {
      counts[pomodoro.tag] = (counts[pomodoro.tag] ?? 0) + 1;
    }
  }
  return counts;
};

export const pruneOldHistory = (
  history: Record<string, TagCounts>,
): Record<string, TagCounts> => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = toDateString(cutoff);

  return Object.fromEntries(
    Object.entries(history).filter(([date]) => date >= cutoffStr),
  );
};

/** 오늘 기준 30일간의 날짜별 기록을 배열로 반환. 포모도로 없는 날은 { all: 0 }으로 채움 */
export const get30DayView = (
  history: Record<string, TagCounts>,
): { date: string; counts: TagCounts }[] => {
  const today = new Date();
  const result: { date: string; counts: TagCounts }[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = toDateString(date);
    result.push({
      date: dateStr,
      counts: history[dateStr] ?? { all: 0 },
    });
  }

  return result;
};
