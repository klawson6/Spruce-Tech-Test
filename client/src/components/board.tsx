import React, { useEffect, useState } from "react";
import { XorO } from "../types";

type BoardPositions = (XorO | undefined)[][];

export default function Board() {
  const [board, setBoard] = useState<BoardPositions>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [turn, setTurn] = useState<XorO>("X");
  const [winner, setWinner] = useState<XorO | "draw" | undefined>(undefined);

  const evaluateGame = (
    board: BoardPositions,
    turn: XorO,
  ): XorO | "draw" | undefined => {
    for (const row of board) {
      if (row.every((v) => v === turn)) return turn;
    }

    for (let i = 0; i < 3; i++) {
      const column = [board[0][i], board[1][i], board[2][i]];
      if (column.every((v) => v === turn)) return turn;
    }

    if ([0, 1, 2].map((i) => board[i][i]).every((v) => v === turn)) return turn;
    if ([0, 1, 2].map((i) => board[2 - i][i]).every((v) => v === turn))
      return turn;

    if (board.every((row) => row.every((v) => v))) return "draw";

    return undefined;
  };

  const handleClick = (x: number, y: number) => {
    if (board[x][y] || winner) return;

    const newBoard = [...board];
    newBoard[x][y] = turn;
    setBoard(newBoard);

    const result = evaluateGame(newBoard, turn);
    if (result) {
      setWinner(result);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const handleReset = () => {
    setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    setTurn("X");
    setWinner(undefined);
  };

  const renderResult = (winner: XorO | "draw" | undefined) => {
    if (winner === "draw")
      return <span className="text-orange-600 font-bold">Draw!</span>;
    if (winner)
      return (
        <span className="text-green-600 font-bold">Winner: {winner}!</span>
      );
    return <span>Current Turn: {turn}</span>;
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="text-xl">{renderResult(winner)}</div>
      <div className="flex flex-col gap-1">
        {board.map((row, i) => (
          <div key={`row-${i}`} className="flex gap-1">
            {row.map((column, j) => (
              <div
                key={`pos-${i}-${j}`}
                className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
                onClick={() => handleClick(i, j)}
              >
                {column}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-xl">
        <button
          className="rounded-md px-2 bg-slate-400 border-2 border-gray-500"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
