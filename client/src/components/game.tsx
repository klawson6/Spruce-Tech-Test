import React, { useEffect, useState } from "react";
import { BoardEntry, CellCoordinate, Result, Winner, XorO } from "../types";
import SizeInput from "./sizeInput";
import { GameStatus } from "./gameStatus";
import { Board } from "./board";
import { MIN_BOARD_SIZE } from "../constants";
import { evaluateGame } from "../utils/gameLogic";

type BoardPositions = BoardEntry[][];

export default function Game() {
  const [board, setBoard] = useState<BoardPositions>(
    Array.from({ length: MIN_BOARD_SIZE }, () =>
      Array.from({ length: MIN_BOARD_SIZE }, () => undefined),
    ),
  );
  const [turn, setTurn] = useState<XorO>("X");
  const [win, setWin] = useState<{
    winner: Winner;
    winningLine?: Array<CellCoordinate>;
  }>({ winner: undefined });
  const [boardSize, setBoardSize] = useState(MIN_BOARD_SIZE);

  const handleClick = (x: number, y: number) => {
    if (board[x][y] || win.winner) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[x][y] = turn;
    setBoard(newBoard);

    const result = evaluateGame(newBoard, turn, boardSize);
    if (result?.winner) {
      setWin(result);
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
    setWin({ winner: undefined });
    setBoardSize(size);
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="text-xl">
        <GameStatus turn={turn} winner={win.winner} />
      </div>
      <Board board={board} handleClick={handleClick} result={win} />
      <SizeInput initialSize={boardSize} handleReset={handleReset} />
    </div>
  );
}
