import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useBoard } from "../context/BoardContext";
import Column from "./Column";
import "../styles/kanban.css";

const KanbanBoard = () => {
  const { board, moveCard } = useBoard();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeCardId = active.id as string;
    const overCardId = over.id as string;

    let fromColumn: string | null = null;
    let toColumn: string | null = null;
    let toIndex = 0;

    board.forEach((col) => {
      const activeIndex = col.cards.findIndex((c) => c.id === activeCardId);
      const overIndex = col.cards.findIndex((c) => c.id === overCardId);

      if (activeIndex !== -1) {
        fromColumn = col.id;
      }

      if (overIndex !== -1) {
        toColumn = col.id;
        toIndex = overIndex;
      }
    });

    if (!toColumn && over.data.current?.columnId) {
      toColumn = over.data.current.columnId;
      toIndex = 999;
    }

    if (fromColumn && toColumn) {
      moveCard(fromColumn, toColumn, activeCardId, toIndex);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        {board.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
