import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* eslint-disable react/prop-types */
const Card = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id, data: {...card} });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full outline-1 shadow-sm rounded-xl p-2 text-sm bg-slate-100"
    >
      {card?.name}
    </div>
  );
};

export default Card;
