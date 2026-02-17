import { Combobox, ComboboxInput } from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FOCUS_LEVELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const StatisticsPage = () => {
  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-between items-center">
        <p className="text-lg text-bold">최근 30일 집중도</p>
        <Combobox>
          <ComboboxInput placeholder="태그 선택" />
        </Combobox>
      </div>
      <div className="w-full grid grid-cols-6 sm:grid-cols-10 gap-2 mt-4">
        {Array.from({ length: 30 }).map((_, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <div className="aspect-square bg-primary/50 rounded-sm hover-bounce" />
            </TooltipTrigger>
            <TooltipContent>1개의 토마토</TooltipContent>
          </Tooltip>
        ))}
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
