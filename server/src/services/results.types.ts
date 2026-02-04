export type GetResultsResponseBody = {
  X: number;
  O: number;
  draw: number;
};

export type PatchResultsRequestBody = {
  size: number;
  winner: "X" | "O" | "draw";
};
