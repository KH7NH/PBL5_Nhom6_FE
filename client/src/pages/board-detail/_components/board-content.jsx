import AddListForm from "@/pages/board-detail/_components/add-list-form";
import List from "@/pages/board-detail/_components/list";
import { Star, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
} from "@dnd-kit/sortable";
import Card from "@/pages/board-detail/_components/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { listApi } from "@/apis/list.api";
import { cardApi } from "@/apis/card.api";
import ShareForm from "@/pages/board-detail/_components/share-form";
import { memberApi } from "@/apis/member.api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = () => {
  const { boardId } = useParams();
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeItemDragType, setActiveItemDragType] = useState(null);
  const [activeItemDragData, setActiveItemDragData] = useState(null);

  const [list, setList] = useState([]);
  const [card, setCard] = useState([]);

  const changeListOrder = useMutation({
    mutationFn: (data) => listApi.changeOrder(data),
  });

  const changeCardOrder = useMutation({
    mutationFn: (data) => cardApi.changeOrderCard(data),
  });

  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: () => listApi.getAllLists(boardId),
  });

  const { data: dataCard } = useQuery({
    queryKey: ["card"],
    queryFn: () => cardApi.getAll(boardId),
  });

  const { data: dataMembers } = useQuery({
    queryKey: ["members", boardId],
    queryFn: () => memberApi.getListMemberInBoard(boardId),
    enabled: !!boardId,
  });

  // console.log("dataMembers", dataMembers?.data?.result);

  const members = useMemo(() => {
    if (!dataMembers?.data?.result) {
      return [];
    }
    return dataMembers?.data?.result.map((member) => member);
  }, [dataMembers]);

  useEffect(() => {
    setList(data?.data?.result || []);
  }, [data]);

  useEffect(() => {
    setCard(dataCard?.data?.result || []);
  }, [dataCard]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("active", active, "over", over);
    if (!over) return;
    if (active.id === over.id) return;
    if (
      activeDragItemId &&
      activeItemDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN
    ) {
      const newList = [...list];
      const oldIndex = list?.findIndex((list) => list.id == active.id);
      const newIndex = list?.findIndex((list) => list.id == over.id);
      const oldPos = list[oldIndex].pos;
      const newPos = list[newIndex].pos;
      newList[oldIndex].pos = newPos;
      newList[newIndex].pos = oldPos;

      setList(newList);
      changeListOrder.mutate({ activeId: active.id, overId: over.id });
    }

    if (activeDragItemId && activeItemDragType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const oldColumnId = active?.data?.current?.list_id;
      const newColumnId = over?.data?.current?.list_id
        ? over?.data?.current?.list_id
        : over?.data?.current?.id;
      changeCardOrder.mutate({
        activeId: activeDragItemId,
        overId: over?.data?.current?.list_id ? over?.data?.current?.id : null,
        oldListId: oldColumnId,
        newListId: newColumnId,
      });
      if (oldColumnId === newColumnId) {
        const newCard = [...card];
        const oldCardIndex = card?.findIndex(
          (card) => card.id == activeDragItemId
        );
        const newCardIndex = card?.findIndex(
          (card) => card.id == over?.data?.current?.id
        );
        const oldCardPos = card[oldCardIndex].pos;
        const newCardPos = card[newCardIndex].pos;
        if (oldCardPos < newCardPos) {
          newCard[oldCardIndex].pos = newCardPos + 1;
        }
        if (oldCardPos > newCardPos) {
          newCard[oldCardIndex].pos = newCardPos - 1;
        }
        setCard(newCard);
      }
      const lengthNewCard = card?.filter(
        (card) => card?.list_id == newColumnId
      ).length;
      if (oldColumnId !== newColumnId && lengthNewCard === 0) {
        const newCard = [...card];
        const oldCardIndex = card?.findIndex(
          (card) => card.id == activeDragItemId
        );
        newCard[oldCardIndex].list_id = newColumnId;
        newCard[oldCardIndex].pos = 10000;
        setCard(newCard);
      }
      if (oldColumnId !== newColumnId && lengthNewCard > 0) {
        const newCard = [...card];
        const oldCardIndex = card?.findIndex(
          (card) => card.id == activeDragItemId
        );
        const newCardIndex = card?.findIndex(
          (card) => card.id == over?.data?.current?.id
        );
        const newCardPos = card[newCardIndex].pos;
        newCard[oldCardIndex].list_id = newColumnId;
        newCard[oldCardIndex].pos = newCardPos - 1;
        newCard[newCardIndex].pos = newCardPos + 1;
        setCard(newCard);
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
      event?.active?.data?.current?.list_id
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveItemDragData(event?.active?.data?.current);
  };

  return (
    <>
      <div className="px-4 py-3 w-full border-b bg-blue-200 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* <h3>{board?.title}</h3> */}
          <Star className="w-4 h-4" />
          <Users className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-4">
          {/* <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Bộ lọc</span>
          </Button> */}
          <div className="flex items-center">{members && members?.length > 0 && members.map((member) => (
            <Avatar style={{ marginLeft: '-15px' }} key={member?.id}>
            <AvatarFallback style={
              {
                backgroundColor: getRandomColor(),
                color: 'white'
              }
            } >
              {String(member?.username).charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          ))}</div>
          <ShareForm members={members} boardId={boardId} />
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
              <List
                list={activeItemDragData}
                cards={card.filter(
                  (card) => card.list_id == activeItemDragData?.id
                )}
              />
            )}
          {activeDragItemId &&
            activeItemDragType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeItemDragData} />
            )}
        </DragOverlay>
        <div className="relative">
          <SortableContext
            strategy={horizontalListSortingStrategy}
            items={list?.map((list) => list.id) || []}
          >
            <div
              style={{ height: "calc(100vh - 64px)" }}
              className="w-full p-4 top-0 left-0 absolute bg-blue-100 flex gap-4 overflow-hidden overflow-x-auto"
            >
              {list
                .sort((a, b) => a.pos - b.pos)
                ?.map((list) => (
                  <List
                    key={list.id}
                    list={list}
                    boardId={boardId}
                    cards={card.filter((card) => card.list_id == list.id)}
                    setCard={setCard}
                  />
                ))}
              <AddListForm boardId={boardId} setList={setList} />
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default BoardContent;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
