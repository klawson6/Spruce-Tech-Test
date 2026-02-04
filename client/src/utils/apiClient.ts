import { Result, Results, ResultsForSize } from "../types";

export const fetchResults = async (): Promise<Results | undefined> => {
  const response = await fetch("/results");

  if (response.ok) {
    return (await response.json()) as Results;
  }
};

export const submitWin = async (
  result: Result,
): Promise<ResultsForSize | undefined> => {
  const response = await fetch("/results", {
    method: "PATCH",
    body: JSON.stringify(result),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return (await response.json()) as ResultsForSize;
  }
};
