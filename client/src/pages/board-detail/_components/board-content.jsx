import { Button } from "@/components/ui/button";
import { changeOrderColumn, getBoards } from "@/lib/dump";
import AddListForm from "@/pages/board-detail/_components/add-list-form";
import List from "@/pages/board-detail/_components/list";
import { SlidersHorizontal, Star, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Card from "@/pages/board-detail/_components/card";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeItemDragType, setActiveItemDragType] = useState(null);
  const [activeItemDragData, setActiveItemDragData] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    const newBoard = getBoards().find((board) => board.id == boardId);
    setBoard(newBoard);
  }, [boardId]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("active", active, "over", over);
    if (!over) return;
    if (active.id === over.id) return;
    if (
      activeDragItemId &&
      activeItemDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN
    ) {
      const oldIndex = board?.list?.findIndex((list) => list.id == active.id);
      const newIndex = board?.list?.findIndex((list) => list.id == over.id);
      const newList = arrayMove(board.list, oldIndex, newIndex);
      setBoard({ ...board, list: newList });
      changeOrderColumn(boardId, newList);
    }

    if (activeDragItemId && activeItemDragType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const oldColumnId = String(active?.id).split("-")[1];
      const newColumnId = String(over?.id).includes("card") ? String(over?.data?.current?.id).split("-")[1] : String(over?.id);
      if(oldColumnId === newColumnId){
        const currentColum = board?.list?.find((list) => list.id == oldColumnId);
        const listCard = currentColum?.card;
        const indexOldCard = listCard?.findIndex((card) => card.id == activeDragItemId);
        const indexNewCard = listCard?.findIndex((card) => card.id == over?.data?.current?.id);
        const element = listCard.splice(indexOldCard, 1)[0];
        listCard.splice(indexNewCard, 0, element);
        currentColum.card = listCard;
        const newList = board?.list?.map((list) => {
          if(list.id == oldColumnId){
            return currentColum
          }
          return list
        })
        setBoard({ ...board, list: newList });
      }
      if(oldColumnId !== newColumnId){
        const currentColum = board?.list?.find((list) => list.id == oldColumnId);
        const listCard = currentColum?.card;
        const indexOldCard = listCard?.findIndex((card) => card.id == activeDragItemId);
        const element = listCard.splice(indexOldCard, 1)[0];
        const newColumn = board?.list?.find((list) => list.id == newColumnId);
        const newListCard = newColumn?.card;
        if(String(over?.id).includes("card")){
          const indexNewCard = newListCard?.findIndex((card) => card.id == over?.data?.current?.id);
          newListCard.splice(indexNewCard, 0, {...element, id: `card-${newColumnId}-${newListCard.length + 1}`});
          newColumn.card = newListCard;
          currentColum.card = listCard;
          const newList = board?.list?.map((list) => {
            if(list.id == oldColumnId){
              return currentColum
            }
            if(list.id == newColumnId){
              return newColumn
            }
            return list
          })
          setBoard({ ...board, list: newList });
        }
        if(!String(over?.id).includes("card")){
          console.log("newColumnId", newColumnId);
          console.log("newColumn", newColumn);
          console.log("newListCard", newListCard);
          newListCard.push({...element, id: `card-${newColumnId}-${newListCard.length + 1}`});
          newColumn.card = newListCard;
          currentColum.card = listCard;
          const newList = board?.list?.map((list) => {
            if(list.id == oldColumnId){
              return currentColum
            }
            if(list.id == newColumnId){
              return newColumn
            }
            return list
          })
          setBoard({ ...board, list: newList });
        }
      }


    }

    setActiveDragItemId(null);
    setActiveItemDragType(null);
    setActiveItemDragData(null);
  };

  const handleDragStart = (event) => {
    console.log("event start", event);
    setActiveDragItemId(event?.active?.id);
    setActiveItemDragType(
      String(event?.active?.data?.current?.id)?.includes("card")
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveItemDragData(event?.active?.data?.current);
  };

  return (
    <>
      <div className="px-4 py-3 w-full border-b bg-blue-200 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3>{board?.title}</h3>
          <Star className="w-4 h-4" />
          <Users className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Bộ lọc</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Chia sẻ</span>
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <DragOverlay>
          {(!activeDragItemId || !activeItemDragType) && null}
          {activeDragItemId &&
            activeItemDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <List list={activeItemDragData} />
            )}
          {activeDragItemId &&
            activeItemDragType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeItemDragData} />
            )}
        </DragOverlay>
        <div className="relative">
          <SortableContext
            strategy={horizontalListSortingStrategy}
            items={board?.list?.map((list) => list.id) || []}
          >
            <div
              style={{ height: "calc(100vh - 64px)" }}
              className="w-full p-4 top-0 left-0 absolute bg-blue-100 flex gap-4 overflow-hidden overflow-x-auto"
            >
              {board?.list?.map((list) => (
                <List
                  key={list.id}
                  list={list}
                  setBoard={setBoard}
                  board={board}
                />
              ))}
              <AddListForm board={board} setBoard={setBoard} />
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default BoardContent;
