import { usePomodoroSettingsStore } from "@/stores/pomodoro-settings";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMemo, useState } from "react";
import {
  DEFAULT_BREAK_TIME,
  DEFAULT_FOCUS_TIME,
  DEFAULT_LONG_BREAK_TIME,
} from "@/lib/constants";
import { toast } from "sonner";

const TimeSetting = () => {
  const {
    focusTime,
    breakTime,
    longBreakTime,
    actions: { setFocusTime, setBreakTime, setLongBreakTime },
  } = usePomodoroSettingsStore();

  const [currentFocusTime, setCurrentFocusTime] = useState(focusTime);
  const [currentBreakTime, setCurrentBreakTime] = useState(breakTime);
  const [currentLongBreakTime, setCurrentLongBreakTime] =
    useState(longBreakTime);

  const checkSaveAvailable = useMemo(() => {
    return (
      currentFocusTime !== focusTime ||
      currentBreakTime !== breakTime ||
      currentLongBreakTime !== longBreakTime
    );
  }, [
    currentFocusTime,
    currentBreakTime,
    currentLongBreakTime,
    focusTime,
    breakTime,
    longBreakTime,
  ]);

  const checkResetAvailable = useMemo(() => {
    return (
      currentFocusTime === DEFAULT_FOCUS_TIME &&
      currentBreakTime === DEFAULT_BREAK_TIME &&
      currentLongBreakTime === DEFAULT_LONG_BREAK_TIME
    );
  }, [currentFocusTime, currentBreakTime, currentLongBreakTime]);

  const handleSaveTime = () => {
    setFocusTime(currentFocusTime);
    setBreakTime(currentBreakTime);
    setLongBreakTime(currentLongBreakTime);

    toast.success("설정이 변경되었어요.");
  };

  const handleResetTime = () => {
    setCurrentFocusTime(DEFAULT_FOCUS_TIME);
    setCurrentBreakTime(DEFAULT_BREAK_TIME);
    setCurrentLongBreakTime(DEFAULT_LONG_BREAK_TIME);

    toast.success("설정이 초기화되었어요.");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>⏱️ 시간 설정</CardTitle>
        <CardDescription>원하는 대로 시간을 변경할 수 있어요.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>👩‍💻 집중 (분)</Label>
          <Input
            type="number"
            min={1}
            max={120}
            value={currentFocusTime}
            onChange={(e) => setCurrentFocusTime(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>🧘‍♀️ 휴식 (분)</Label>
          <Input
            type="number"
            min={1}
            max={120}
            value={currentBreakTime}
            onChange={(e) => setCurrentBreakTime(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>🛌 긴 휴식 (분)</Label>
          <Input
            type="number"
            min={1}
            max={120}
            value={currentLongBreakTime}
            onChange={(e) => setCurrentLongBreakTime(Number(e.target.value))}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-2 w-full">
          <Button
            className="w-1/2 sm:w-1/4"
            onClick={handleSaveTime}
            disabled={!checkSaveAvailable}
          >
            저장
          </Button>
          <Button
            variant="outline"
            className="w-1/2 sm:w-1/4"
            onClick={handleResetTime}
            disabled={checkResetAvailable}
          >
            초기화
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TimeSetting;
