import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PAGE_PATHS } from "@/lib/navigation";
import { AlertCircleIcon } from "lucide-react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(PAGE_PATHS.HOME);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon />
          </EmptyMedia>
          <EmptyTitle>어라! 존재하지 않는 페이지예요.</EmptyTitle>
          <EmptyDescription>
            아래 버튼을 클릭해서 홈으로 돌아갈 수 있어요.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={handleHomeClick}>홈으로 돌아가기</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default NotFoundPage;
