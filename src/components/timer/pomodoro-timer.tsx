import { ChevronRightIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useOpenTagAddModal } from "@/stores/tag-add-modal";
import { useSelectedTag } from "@/stores/pomodoro-settings";

const PomodoroTimer = () => {
  const openTagAddModal = useOpenTagAddModal();
  const selectedTag = useSelectedTag();

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <Badge
        onClick={openTagAddModal}
        className="cursor-pointer flex items-center gap-1"
      >
        <p className="max-w-20 truncate">
          {selectedTag || "태그를 선택해요."}{" "}
        </p>
        <ChevronRightIcon className="size-4" />
      </Badge>
      <p className="text-8xl font-bold">25:00</p>
      <div className="flex gap-2">
        <Button size="lg">
          <PlayIcon className="size-4" />
          시작
        </Button>
        <Button variant="secondary" size="lg">
          <PauseIcon className="size-4" />
          중지
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
