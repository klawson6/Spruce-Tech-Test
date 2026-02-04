export type GetResultsResponseBody = {
  X: number;
  O: number;
  draw: number;
};

export type PostResultsRequestBody = {
  size: number;
  winner: "X" | "O" | "draw";
};
