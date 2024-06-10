import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Editor from "@/components/editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardApi } from "@/apis/card.api";
import ColorPicker from "@/pages/board-detail/_components/color-picker";
import { cn } from "@/lib/utils";
import Comment from "@/pages/board-detail/_components/comment";

/* eslint-disable react/prop-types */
const Card = ({ card }) => {
  const [open, setOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { ...card } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
  };

  const queryClient = useQueryClient();

  const [cardDetail, setCardDetail] = useState({ ...card });

  const [color, setColor] = useState(cardDetail?.color ? JSON.parse(cardDetail?.color) : []);


  const updateCard = useMutation({
    mutationFn: () => cardApi.updateCard(card.id, {
      ...cardDetail,
      color: JSON.stringify(color),
      board_id: card.board_id
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
      setOpen(false);
    },
  });

  const deleteCard = useMutation({
    mutationFn: () => cardApi.deleteCard(card.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
      setOpen(false);
    },
  });

  const handleUpdateCard = async () => {
      updateCard.mutate();
  };

  const handleDeleteCard = () => {
    deleteCard.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="w-full outline-1 shadow-sm rounded-xl text-sm bg-slate-100 overflow-hidden p-2"
        >
          <div className="flex flex-wrap gap-2 mb-1"> {
                color.map((cl, index) => {
                    return (
                        <div
                            key={index}
                            className={cn(
                                "w-14 h-4 rounded-sm"
                            )}
                            style={{ backgroundColor: cl }}
                        ></div>
                    )
                })
            }</div>
          <div>{card?.name}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[600px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Chi tiết thẻ</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            onChange={(e) =>
              setCardDetail({ ...cardDetail, name: e.target.value })
            }
            id="name"
            value={cardDetail?.name}
            className="w-full"
          />
          <ColorPicker color={color} setColor={setColor} />
          <Editor
            value={cardDetail?.description}
            setValue={(e) => setCardDetail({ ...cardDetail, description: e })}
          />
          <Comment cardId={card.id} />
        </div>
        <div className="flex gap-2 justify-end">
          <Button onClick={handleUpdateCard}>Lưu</Button>
          <Button onClick={handleDeleteCard} variant="destructive">
            Xoá
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
