import { useTagAddModalStore } from "@/stores/tag-add-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useTagStore } from "@/stores/tag";
import TagItem from "../tags/tag-item";
import { useState } from "react";
import { Input } from "../ui/input";
import { useSetSelectedTag } from "@/stores/pomodoro-settings";

const TagAddModal = () => {
  const {
    isOpen,
    actions: { close },
  } = useTagAddModalStore();
  const {
    tags,
    actions: { addTag },
  } = useTagStore();
  const setSelectedTag = useSetSelectedTag();

  const [isAdd, setIsAdd] = useState(false);
  const [newTag, setNewTag] = useState("");

  const checkExistTag = (tag: string) => {
    return tags.includes(tag);
  };

  const handleAddTagClick = () => {
    setIsAdd(!isAdd);
  };

  const handleAddTag = () => {
    if (newTag.trim() === "") return;
    if (checkExistTag(newTag)) return;

    addTag(newTag);
    setNewTag("");
    setIsAdd(false);
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>태그 선택하기</DialogTitle>
        <DialogDescription>집중할 태그를 선택해 주세요.</DialogDescription>
        <div className="flex gap-2 flex-wrap">
          <Button size="icon-xs" onClick={handleAddTagClick}>
            <PlusIcon />
          </Button>
          {isAdd && (
            <Input
              className="w-20 h-6 text-xs"
              placeholder="새로운 태그"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTag();
                }
              }}
              onBlur={handleAddTag}
            />
          )}
          {tags.map((tag) => (
            <TagItem key={tag} tag={tag} isEditable onClick={handleSelectTag} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagAddModal;
