import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

type TagState = {
  tags: string[];
};

const initialState: TagState = {
  tags: ["집중", "공부", "운동", "독서"],
};

const useTag = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          addTag: (tag: string) =>
            set((state) => ({ tags: [...state.tags, tag] })),
          removeTag: (tag: string) =>
            set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
        },
      })),
      { name: "tag", partialize: (state) => ({ tags: state.tags }) }
    ),
    { name: "tag" }
  )
);

export const useTagStore = () => useTag();
