import React, { useCallback, useEffect, useState } from "react";
import { ResultsCard } from "./results";
import Game from "./game";
import { Results } from "../types";
import { fetchResults } from "../utils/apiClient";

export const Layout = ({}) => {
  const [results, setResults] = useState<Results | null>(null);
  const [err, setErr] = useState(false);

  const refreshResults = useCallback(async () => {
    const response = await fetchResults();
    if (response) {
      setResults(response);
      setErr(false);
    } else setErr(true);
  }, []);

  useEffect(() => {
    refreshResults();
  }, []);

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col-reverse gap-2 md:flex-row">
        <ResultsCard results={results} err={err} />
        <Game onGameEnd={refreshResults} />
      </div>
    </div>
  );
};
