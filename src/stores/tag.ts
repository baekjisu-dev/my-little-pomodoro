import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TagState = {
  tags: string[];
};

type TagStore = TagState & {
  actions: {
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
  };
};

const initialState: TagState = {
  tags: ["집중", "공부", "운동", "독서"],
};

const useTag = create<TagStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        actions: {
          addTag: (tag: string) =>
            set((state) => ({ tags: [...state.tags, tag] })),
          removeTag: (tag: string) =>
            set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
        },
      }),
      { name: "tag", partialize: (state) => ({ tags: state.tags }) },
    ),
    { name: "tag" },
  ),
);

export const useTagStore = () => useTag();

export const useTags = () => useTag((state) => state.tags);
