import { useTagAddModalStore } from "@/stores/tag-add-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const TagAddModal = () => {
  const {
    isOpen,
    actions: { close },
  } = useTagAddModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>태그 선택하기</DialogTitle>
        <DialogDescription>집중할 태그를 선택해 주세요.</DialogDescription>
        <div className="flex gap-2 flex-wrap">
          <Button size="icon">
            <PlusIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagAddModal;
