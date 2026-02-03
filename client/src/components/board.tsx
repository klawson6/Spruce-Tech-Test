import React, { useEffect, useState } from "react";
import { BoardEntry, Result, XorO } from "../types";
import SizeInput from "./sizeInput";

type BoardPositions = BoardEntry[][];

const evaluateGame = (
  board: BoardPositions,
  turn: XorO,
  boardSize: number,
): Result => {
  for (const row of board) {
    if (row.every((v) => v === turn)) return turn;
  }

  const diagonal: Array<BoardEntry> = Array.from(
    { length: boardSize },
    () => undefined,
  );

  const antiDiagonal: Array<BoardEntry> = Array.from(
    { length: boardSize },
    () => undefined,
  );

  for (let i = 0; i < boardSize; i++) {
    if (board[i].every((v) => v === turn)) return turn;

    if (board.map((r) => r[i]).every((v) => v === turn)) return turn;

    diagonal[i] = board[i][i];
    antiDiagonal[i] = board[boardSize - 1 - i][i];
  }

  if (diagonal.every((v) => v === turn)) return turn;
  if (antiDiagonal.every((v) => v === turn)) return turn;

  if (board.every((row) => row.every((v) => v))) return "draw";

  return undefined;
};

export default function Board() {
  const [board, setBoard] = useState<BoardPositions>(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => undefined)),
  );
  const [turn, setTurn] = useState<XorO>("X");
  const [winner, setWinner] = useState<Result>(undefined);
  const [boardSize, setBoardSize] = useState(3);

  const handleClick = (x: number, y: number) => {
    if (board[x][y] || winner) return;

    const newBoard = [...board];
    newBoard[x][y] = turn;
    setBoard(newBoard);

    const result = evaluateGame(newBoard, turn, boardSize);
    if (result) {
      setWinner(result);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const handleReset = () => {
    setBoard(
      Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => undefined),
      ),
    );
    setTurn("X");
    setWinner(undefined);
  };

  const renderResult = (winner: Result) => {
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
      <SizeInput
        size={boardSize}
        setSize={setBoardSize}
        handleReset={handleReset}
      />
    </div>
  );
}
