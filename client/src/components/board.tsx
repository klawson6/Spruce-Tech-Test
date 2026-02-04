import React from "react";
import { BoardPositions, CellCoordinate, Win, Winner } from "../types";

export type BoardProps = {
  board: BoardPositions;
  handleClick: (x: number, y: number) => void;
  result: Win;
};

export const Board = ({ board, handleClick, result }: BoardProps) => {
  const isWinningCell = (row: number, col: number) => {
    return result.winningLine?.some(({ x, y }) => x === col && y === row);
  };

  return (
    <div className="flex flex-col gap-1">
      {board.map((row, i) => (
        <div key={`row-${i}`} className="flex gap-1">
          {row.map((cell, j) => (
            <button
              key={`pos-${j}-${i}`}
              className={`border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold
                 ${isWinningCell(i, j) ? "bg-green-600 animate-pulse-fast" : ""}`}
              onClick={() => handleClick(i, j)}
              type="button"
              aria-label={`Row ${i + 1}, Column ${j + 1}, ${cell || "Empty"}`}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
