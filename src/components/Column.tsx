import React, { useState } from "react";
import type { ColumnType } from "../types/board.types";
import { useBoard } from "../context/BoardContext";
import Card from "./Card";

const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
  const { addCard, moveCard } = useBoard();

  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addCard(column.id, text);
    setText("");
    setShowInput(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("card"));

    moveCard(data.fromColumn, column.id, data.cardId, column.cards.length);
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
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

      {column.cards.map((card, index) => (
        <Card key={card.id} card={card} columnId={column.id} index={index} />
      ))}
    </div>
  );
};

export default Column;
