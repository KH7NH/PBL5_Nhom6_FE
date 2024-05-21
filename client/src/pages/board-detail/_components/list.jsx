/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCard } from "@/lib/dump";
import { Ellipsis, Plus, X } from "lucide-react";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "@/pages/board-detail/_components/card";

const List = ({ list, setBoard, board }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddCard = () => {
    const newData = createCard(board.id, list.id, { name: title });
    setBoard(newData);
    setOpen(false);
    setTitle("");
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: list.id, data: { ...list } });

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
        <Ellipsis className="w-4 h-4" />
      </div>
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={list?.card?.map((card) => `${card.id}`) || []}
      >
        <div className="flex flex-col gap-2 mt-4">
          {list?.card?.map((card) => (
            <Card key={card.id} card={card} />
          ))}
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
      </SortableContext>
    </div>
  );
};

export default List;
