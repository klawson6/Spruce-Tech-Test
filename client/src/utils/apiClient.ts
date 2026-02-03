import { WinStats } from "../types";

export const fetchStats = async (): Promise<WinStats> => {
  await new Promise((r) => setTimeout(r, 2000));

  return {
    X: 5,
    O: 3,
    draw: 2,
  };
};
