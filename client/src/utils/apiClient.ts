import { Results } from "../types";

export const fetchResults = async (): Promise<Results | undefined> => {
  const response = await fetch("/results");

  if (response.ok) {
    return (await response.json()) as Results;
  }
};
