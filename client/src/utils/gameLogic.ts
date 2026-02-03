import { BoardPositions, XorO, Result } from "../types";

export const evaluateGame = (
  board: BoardPositions,
  turn: XorO,
  boardSize: number,
): Result => {
  let diagonalWin = true;
  const winningDiagonal = Array(boardSize);
  let antiDiagonalWin = true;
  const winningAntiDiagonal = Array(boardSize);

  for (let i = 0; i < boardSize; i++) {
    // Evaluate row
    if (board[i].every((v) => v === turn))
      return {
        winner: turn,
        winningLine: board[i].map((_, x) => ({ x, y: i })),
      };

    // Evaluate column
    let columnWin = true;
    const winningColumn = Array(boardSize);
    for (let j = 0; j < boardSize; j++) {
      if (board[j][i] !== turn) {
        columnWin = false;
        break;
      }
      winningColumn[j] = { x: i, y: j };
    }
    if (columnWin)
      return {
        winner: turn,
        winningLine: winningColumn,
      };

    // Build diagonal
    if (diagonalWin && board[i][i] !== turn) diagonalWin = false;
    winningDiagonal[i] = { x: i, y: i };

    // Build anti-diagonal
    if (antiDiagonalWin && board[i][boardSize - 1 - i] !== turn)
      antiDiagonalWin = false;
    winningAntiDiagonal[i] = { x: boardSize - 1 - i, y: i };
  }

  // Evaluate diagonals
  if (diagonalWin)
    return {
      winner: turn,
      winningLine: winningDiagonal,
    };
  if (antiDiagonalWin)
    return {
      winner: turn,
      winningLine: winningAntiDiagonal,
    };

  // Evaluate draw
  if (board.every((row) => row.every((v) => v))) return { winner: "draw" };

  // Game unfinished
  return { winner: undefined };
};
