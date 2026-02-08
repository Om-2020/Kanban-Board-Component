import React, { useState } from "react";
import type { CardType } from "../types/board.types";
import { useBoard } from "../context/BoardContext";

type Props = {
  card: CardType;
  columnId: string;
  index: number;
};

const Card: React.FC<Props> = ({ card, columnId, index }) => {
  const { deleteCard, updateCard } = useBoard();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.title);

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "card",
      JSON.stringify({ cardId: card.id, fromColumn: columnId, index })
    );
  };

  return (
    <div className={`card ${columnId}`} draggable onDragStart={onDragStart}>
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
        onClick={() => deleteCard(columnId, card.id)}
      >
        🗑
      </button>
    </div>
  );
};

export default Card;
