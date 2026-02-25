import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FOCUS_LEVELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePomodoroHistory30Days } from "@/stores/pomodoro-history";
import { useTags } from "@/stores/tag";
import { useMemo, useState } from "react";
import type { TagOption } from "types";

const StatisticsPage = () => {
  const pomodoroHistory30Days = usePomodoroHistory30Days();
  const tags = useTags();

  const [selectedTag, setSelectedTag] = useState<TagOption>({
    label: "전체",
    value: "all",
  });

  const tagOptions = useMemo((): TagOption[] => {
    return [
      { label: "전체", value: "all" },
      ...tags.map((tag) => ({ label: tag, value: tag })),
    ];
  }, [tags]);

  const getFocusLevel = (count: number) =>
    FOCUS_LEVELS[Math.min(count, FOCUS_LEVELS.length - 1)];

  const handleSelectTag = (value: TagOption | null) => {
    if (value) setSelectedTag(value);
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-between items-center">
        <p className="text-lg text-bold">
          최근 30일 집중도{" "}
          <span className="text-xs text-muted-foreground">
            매일 12시에 업데이트돼요
          </span>
        </p>
        <Combobox
          items={tagOptions}
          itemToStringValue={(tag: TagOption) => tag.label}
          onValueChange={handleSelectTag}
          value={selectedTag}
        >
          <ComboboxInput placeholder="태그 선택" />
          <ComboboxContent>
            <ComboboxEmpty>태그가 없어요</ComboboxEmpty>
            <ComboboxList>
              {(tag) => (
                <ComboboxItem key={tag.value} value={tag}>
                  {tag.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="w-full grid grid-cols-6 sm:grid-cols-10 gap-2 mt-4">
        {pomodoroHistory30Days.map(({ date, counts }) => {
          const count = counts[selectedTag.value] ?? 0;
          return (
            <Tooltip key={date}>
              <TooltipTrigger>
                <div
                  className={cn(
                    "aspect-square rounded-sm hover-bounce",
                    getFocusLevel(count),
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>
                {date}: {count}개의 토마토
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <div className="w-full flex justify-end items-center pt-4 gap-1">
        <p className="text-sm text-muted-foreground">적음</p>
        {FOCUS_LEVELS.map((level, index) => (
          <div key={index} className={cn("w-3 h-3 rounded-[4px]", level)} />
        ))}
        <p className="text-sm text-muted-foreground">많음</p>
      </div>
    </div>
  );
};

export default StatisticsPage;
