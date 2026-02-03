export type XorO = "X" | "O";

export type BoardEntry = XorO | undefined;

export type Winner = "X" | "O" | "draw" | undefined;

export type BoardPositions = BoardEntry[][];

export type CellCoordinate = { x: number; y: number };

export type Result = { winner: Winner; winningLine?: Array<CellCoordinate> };
