import React, { useEffect, useState } from "react";
import { BoardEntry, Result, XorO } from "../types";
import SizeInput from "./sizeInput";
import { GameStatus } from "./gameStatus";
import { Board } from "./board";
import { MIN_BOARD_SIZE } from "../constants";

type BoardPositions = BoardEntry[][];

const evaluateGame = (
  board: BoardPositions,
  turn: XorO,
  boardSize: number,
): Result => {
  let diagonalWin = true;
  let antiDiagonalWin = true;

  for (let i = 0; i < boardSize; i++) {
    if (board[i].every((v) => v === turn)) return turn;

    let columnWin = true;
    for (const row of board) {
      if (row[i] !== turn) {
        columnWin = false;
        break;
      }
    }
    if (columnWin) return turn;

    if (diagonalWin && board[i][i] !== turn) diagonalWin = false;
    if (antiDiagonalWin && board[boardSize - 1 - i][i] !== turn)
      antiDiagonalWin = false;
  }

  if (diagonalWin || antiDiagonalWin) return turn;

  if (board.every((row) => row.every((v) => v))) return "draw";

  return undefined;
};

export default function Game() {
  const [board, setBoard] = useState<BoardPositions>(
    Array.from({ length: MIN_BOARD_SIZE }, () =>
      Array.from({ length: MIN_BOARD_SIZE }, () => undefined),
    ),
  );
  const [turn, setTurn] = useState<XorO>("X");
  const [winner, setWinner] = useState<Result>(undefined);
  const [boardSize, setBoardSize] = useState(MIN_BOARD_SIZE);

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

  const handleReset = (size: number = boardSize) => {
    setBoard(
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => undefined),
      ),
    );
    setTurn("X");
    setWinner(undefined);
    setBoardSize(size);
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="text-xl">
        <GameStatus turn={turn} winner={winner} />
      </div>
      <Board board={board} handleClick={handleClick} />
      <SizeInput initialSize={boardSize} handleReset={handleReset} />
    </div>
  );
}
