import PomodoroHistory from "@/components/timer/pomodoro-history";
import PomodoroTimer from "@/components/timer/pomodoro-timer";

const IndexPage = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <p className="text-md mt-8 text-muted-foreground">
        오늘도 바구니에 토마토를 채워요!
      </p>
      <PomodoroTimer />
      <PomodoroHistory />
    </div>
  );
};

export default IndexPage;
