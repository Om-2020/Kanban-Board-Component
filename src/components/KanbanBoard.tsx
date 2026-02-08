import { useBoard } from "../context/BoardContext";
import Column from "./Column";
import "../styles/kanban.css";

const KanbanBoard = () => {
  const { board } = useBoard();

  return (
    <div className="board">
      {board.map(col => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  );
};

export default KanbanBoard;
