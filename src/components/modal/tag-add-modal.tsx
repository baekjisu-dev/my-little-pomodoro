import { useTagAddModalStore } from "@/stores/tag-add-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Badge } from "../ui/badge";

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
          <Button size="icon-xs">
            <PlusIcon />
          </Button>
          <Badge variant="secondary" className="grow-0">
            태그 1
            <XIcon className="size-3" />
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagAddModal;
