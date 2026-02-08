import { BoardProvider } from "./context/BoardContext";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <BoardProvider>
      <KanbanBoard />
    </BoardProvider>
  );
}

export default App;
