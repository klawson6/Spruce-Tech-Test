import React from "react";
import { Winner, XorO } from "../types";

export type GameStatus = {
  turn: XorO;
  winner: Winner;
};

export const GameStatus = ({ turn, winner }: GameStatus) => {
  if (winner === "draw")
    return <span className="text-orange-600 font-bold">Draw!</span>;

  if (winner)
    return <span className="text-green-600 font-bold">Winner: {winner}!</span>;

  return <span>Current Turn: {turn}</span>;
};
