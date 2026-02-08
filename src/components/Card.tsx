import React, { useState } from "react";
import type { CardType } from "../types/board.types";
import { useBoard } from "../context/BoardContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  card: CardType;
  columnId: string;
  index: number;
};

const Card: React.FC<Props> = ({ card, columnId }) => {
  const { deleteCard, updateCard } = useBoard();

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
      data: { columnId },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`card ${columnId}`}>
      {/* DRAG HANDLE ONLY */}
      <div
        className="dragHandle"
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          marginBottom: "6px",
          fontSize: "12px",
          opacity: 0.6,
        }}
      >
        ⠿ Drag
      </div>

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            updateCard(columnId, card.id, text);
            setEditing(false);
          }}
          autoFocus
        />
      ) : (
        <p onDoubleClick={() => setEditing(true)}>{card.title}</p>
      )}

      <button
        className="deleteBtn"
        onClick={(e) => {
          e.stopPropagation();
          deleteCard(columnId, card.id);
        }}
      >
        🗑
      </button>
    </div>
  );
};

export default Card;
