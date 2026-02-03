import React from "react";
import { BoardPositions } from "../types";

export type BoardProps = {
  board: BoardPositions;
  handleClick: (x: number, y: number) => void;
};

export const Board = ({ board, handleClick }: BoardProps) => {
  return (
    <div className="flex flex-col gap-1">
      {board.map((row, i) => (
        <div key={`row-${i}`} className="flex gap-1">
          {row.map((space, j) => (
            <button
              key={`pos-${i}-${j}`}
              className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
              onClick={() => handleClick(i, j)}
              type="button"
              aria-label={`Row ${i + 1}, Column ${j + 1}, ${space || "Empty"}`}
            >
              {space}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
