import React, { useState } from "react";
import type { ColumnType } from "../types/board.types";
import { useBoard } from "../context/BoardContext";
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
  const { addCard } = useBoard();

  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      columnId: column.id,
    },
  });

  const handleAdd = () => {
    if (!text.trim()) return;
    addCard(column.id, text);
    setText("");
    setShowInput(false);
  };

  return (
    <div ref={setNodeRef} className="column">
      <div className={`columnHeader ${column.id}`}>
        <div className="columnTitle">
          {column.title}
          <span className="count">{column.cards.length}</span>
        </div>

        <button className="addIcon" onClick={() => setShowInput(true)}>
          +
        </button>
      </div>

      {!showInput ? (
        <div className="addCardBtn" onClick={() => setShowInput(true)}>
          <span className="addIconText">+</span>
          <span>Add Card</span>
        </div>
      ) : (
        <div className="addCardInputWrap">
          <textarea
            placeholder="Enter card title..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />

          <div className="addActions">
            <button className="addConfirm" onClick={handleAdd}>
              Add Card
            </button>

            <button className="cancelBtn" onClick={() => setShowInput(false)}>
              ✕
            </button>
          </div>
        </div>
      )}

      <SortableContext
        items={column.cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.cards.map((card, index) => (
          <Card key={card.id} card={card} columnId={column.id} index={index} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
