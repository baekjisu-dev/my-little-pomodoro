import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRightIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useOpenTagAddModal } from "@/stores/tag-add-modal";
import {
  usePomodoroSettingsStore,
  useSelectedTag,
} from "@/stores/pomodoro-settings";
import { formatTime } from "@/lib/utils";
import { usePomodoroStateStore } from "@/stores/pomodoro-status";

const PomodoroTimer = () => {
  const openTagAddModal = useOpenTagAddModal();
  const selectedTag = useSelectedTag();
  const {
    isRunning,
    currentPhase,
    actions: { setIsRunning, setCurrentPhase },
  } = usePomodoroStateStore();
  const { focusTime, breakTime } = usePomodoroSettingsStore();

  const [remainingSeconds, setRemainingSeconds] = useState(focusTime * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initSeconds = () => {
    const initSeconds =
      currentPhase === "focus" ? focusTime * 60 : breakTime * 60;

    setRemainingSeconds(initSeconds);
  };

  const initializeTimer = () => {
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          changePhase();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const changePhase = () => {
    if (currentPhase === "focus") {
      setCurrentPhase("break");
      setRemainingSeconds(0.5 * 60);
    } else if (currentPhase === "break") {
      setCurrentPhase("focus");
      setRemainingSeconds(0.5 * 60);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    initializeTimer();
  };

  const handlePause = () => {
    setIsRunning(false);
    clearTimer();
  };

  useEffect(() => {
    initSeconds();

    return () => {
      clearTimer();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {currentPhase === "focus" ? (
        <Badge
          onClick={openTagAddModal}
          className="cursor-pointer flex items-center gap-1"
        >
          <p className="max-w-20 truncate">
            {selectedTag || "태그를 선택해요."}
          </p>
          <ChevronRightIcon className="size-4" />
        </Badge>
      ) : (
        <p>휴식 시간 </p>
      )}
      <p className="text-8xl font-bold tabular-nums">
        {formatTime(remainingSeconds)}
      </p>
      <div className="flex gap-2">
        <Button size="lg" onClick={handleStart} disabled={isRunning}>
          <PlayIcon className="size-4" />
          시작
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={handlePause}
          disabled={!isRunning}
        >
          <PauseIcon className="size-4" />
          중지
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
