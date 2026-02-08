import React, { createContext, useContext, useState } from "react";
import type { BoardType, CardType } from "../types/board.types";
import { initialBoard } from "../data/mockData";

type BoardContextType = {
  board: BoardType;
  addCard: (columnId: string, title: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  updateCard: (columnId: string, cardId: string, title: string) => void;
  moveCard: (
    fromColumn: string,
    toColumn: string,
    cardId: string,
    toIndex: number
  ) => void;
};

const BoardContext = createContext<BoardContextType | null>(null);

export const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("BoardContext missing");
  return ctx;
};

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<BoardType>(initialBoard);

  const addCard = (columnId: string, title: string) => {
    setBoard(prev =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              cards: [...col.cards, { id: Date.now().toString(), title }],
            }
          : col
      )
    );
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setBoard(prev =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          : col
      )
    );
  };

  const updateCard = (
    columnId: string,
    cardId: string,
    title: string
  ) => {
    setBoard(prev =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map(c =>
                c.id === cardId ? { ...c, title } : c
              ),
            }
          : col
      )
    );
  };

  const moveCard = (
    fromColumn: string,
    toColumn: string,
    cardId: string,
    toIndex: number,
  ) => {
    setBoard((prev) => {
      let movedCard: CardType | null = null;

      const boardWithoutCard = prev.map((col) => {
        if (col.id === fromColumn) {
          const card = col.cards.find((c) => c.id === cardId);
          movedCard = card || null;

          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          };
        }
        return col;
      });

      return boardWithoutCard.map((col) => {
        if (col.id === toColumn && movedCard) {
          const cards = [...col.cards];
          const safeIndex = Math.min(toIndex, cards.length);
          cards.splice(safeIndex, 0, movedCard);
          return { ...col, cards };
        }
        return col;
      });
    });
  };

  return (
    <BoardContext.Provider
      value={{ board, addCard, deleteCard, updateCard, moveCard }}
    >
      {children}
    </BoardContext.Provider>
  );
};
