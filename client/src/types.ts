export type XorO = "X" | "O";

export type BoardEntry = XorO | undefined;

export type Winner = "X" | "O" | "draw" | undefined;

export type BoardPositions = BoardEntry[][];

export type CellCoordinate = { x: number; y: number };

export type Win = { winner: Winner; winningLine?: Array<CellCoordinate> };

export type Results = {
  X: number;
  O: number;
  draw: number;
};

export type ResultsForSize = {
  size: number;
} & Results;

export type Result = {
  size: number;
  winner: XorO | "draw";
};
