const PomodoroHistory = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <p className="text-md text-muted-foreground">오늘 담은 토마토</p>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <p key={index} className="text-xl hover-bounce">
              🍅
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PomodoroHistory;
