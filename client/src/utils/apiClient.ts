import { WinStats } from "../types";

export const fetchStats = async (): Promise<WinStats | undefined> => {
  const response = await fetch("/statistics");

  if (response.ok) {
    return (await response.json()) as WinStats;
  }
};
