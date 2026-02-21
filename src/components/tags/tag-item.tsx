import { XIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useTagStore } from "@/stores/tag";
import { useOpenAlertModal } from "@/stores/alert-modal";
import { Button } from "../ui/button";
import { usePomodoroSettingsStore } from "@/stores/pomodoro-settings";

interface TagItemProps {
  tag: string;
  isEditable?: boolean;
  onClick?: (tag: string) => void;
}

const TagItem = ({ tag, isEditable = false, onClick }: TagItemProps) => {
  const {
    selectedTag,
    actions: { setSelectedTag },
  } = usePomodoroSettingsStore();
  const {
    tags,
    actions: { removeTag },
  } = useTagStore();
  const openAlertModal = useOpenAlertModal();

  const handleRemoveTag = () => {
    openAlertModal({
      title: "태그 삭제",
      description: `${tag} 태그를 삭제하시겠어요?`,
      onPositive: () => {
        removeTag(tag);

        // * 만일 삭제된 태그가 선택된 태그라면, 맨 첫 번째 태그를 대신 선택
        if (tag === selectedTag) {
          setSelectedTag(tags[0]);
        }
      },
    });
  };

  return (
    <Badge
      variant="secondary"
      className="grow-0 h-[30px]"
      onClick={() => onClick?.(tag)}
    >
      {tag}
      {isEditable && tag !== "집중" && (
        <Button size="icon-xs" variant="ghost" onClick={handleRemoveTag}>
          <XIcon className="size-3" onClick={handleRemoveTag} />
        </Button>
      )}
    </Badge>
  );
};

export default TagItem;
