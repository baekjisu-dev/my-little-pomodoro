export type Pomodoro = {
  uuid: string;
  tag: string;
  createdAt: number;
};

export type TagOption = {
  label: string;
  value: string;
};

export type TagCounts = { [tag: string]: number; all: number };
