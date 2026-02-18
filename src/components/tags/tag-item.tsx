import { XIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useTagStore } from "@/stores/tag";
import { useOpenAlertModal } from "@/stores/alert-modal";
import { Button } from "../ui/button";

interface TagItemProps {
  tag: string;
  isEditable?: boolean;
  onClick?: (tag: string) => void;
}

const TagItem = ({ tag, isEditable = false, onClick }: TagItemProps) => {
  const {
    actions: { removeTag },
  } = useTagStore();
  const openAlertModal = useOpenAlertModal();

  const handleRemoveTag = () => {
    openAlertModal({
      title: "태그 삭제",
      description: `${tag} 태그를 삭제하시겠어요?`,
      onPositive: () => {
        removeTag(tag);
      },
    });
  };

  return (
    <Badge
      variant="secondary"
      className="grow-0"
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
