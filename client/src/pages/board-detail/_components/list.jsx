/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ellipsis, Plus, X } from "lucide-react";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "@/pages/board-detail/_components/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardApi } from "@/apis/card.api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { listApi } from "@/apis/list.api";

const List = ({ list, boardId, cards, setCard }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const createCardMutation = useMutation({
    mutationFn: (data) => cardApi.create(data),
    onSuccess: (data) => {
      setCard((prev) => [...prev, data.data?.result]);
      setOpen(false);
      setTitle("");
    },
  });

  const handleAddCard = () => {
    createCardMutation.mutate({
      name: title,
      list_id: list.id,
      board_id: boardId,
    });
  };
  const deleteListMutation = useMutation({
    mutationFn: (id) => listApi.deleteList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
  });
  const handleDeleteList = () => {
    deleteListMutation.mutate(list.id);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id, data: { ...list } });

  const style = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-72 rounded-xl bg-slate-50 text-sm h-fit px-4 py-2 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span>{list?.name}</span>

        <Popover>
          <PopoverTrigger>
            <Ellipsis className="w-4 h-4" />
          </PopoverTrigger>
          <PopoverContent className="p-1"><div onClick={handleDeleteList} className="text-sm hover:bg-slate-100 p-2 rounded-md cursor-pointer">Xoá</div></PopoverContent>
        </Popover>
      </div>
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={cards?.map((card) => `${card?.id}`) || []}
      >
        <div className="flex flex-col gap-2 mt-4">
          {cards &&
            cards.length > 0 &&
            cards
              .sort((a, b) => a?.pos - b?.pos)
              .map((card) => <Card key={card.id} card={card} />)}
        </div>
      </SortableContext>
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="w-full p-2 text-sm bg-slate-50 flex items-center gap-4 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> <span>Thêm thẻ</span>
        </div>
      )}
      {open && (
        <div className="w-full p-2 text-sm bg-slate-50 gap-4 cursor-pointer">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            type="text"
            placeholder="Nhập tên thẻ"
          />
          <div className="flex gap-2 items-center mt-2">
            <Button onClick={handleAddCard} variant="main">
              Thêm
            </Button>
            <X
              onClick={() => setOpen(false)}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
