import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>⏱️ 시간 설정</CardTitle>
          <CardDescription>
            원하는 대로 시간을 변경할 수 있어요.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>👩‍💻 집중 (분)</Label>
            <Input type="number" min={1} max={120} defaultValue={25} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>🧘‍♀️ 휴식 (분)</Label>
            <Input type="number" min={1} max={120} defaultValue={25} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>🛌 긴 휴식 (분)</Label>
            <Input type="number" min={1} max={120} defaultValue={25} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-2 w-full">
            <Button className="w-1/2 sm:w-1/4">저장</Button>
            <Button variant="outline" className="w-1/2 sm:w-1/4">
              초기화
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;
