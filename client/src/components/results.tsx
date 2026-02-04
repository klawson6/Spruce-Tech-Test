import React, { useEffect, useState } from "react";
import { fetchResults } from "../utils/apiClient";
import { Results } from "../types";
import { Spinner } from "./spinner";

type ResultsCardProps = {
  results: Results | null;
  err: boolean;
};

export const ResultsCard = ({ results, err }: ResultsCardProps) => {
  return (
    <div className="flex flex-col gap-10 text-xl border-2 rounded-md border-black p-5 w-60 mb-auto mx-auto">
      <span className="text-center">Results</span>
      {results ? (
        <>
          <hr className="border-1 border-black" />
          <table>
            <thead>
              <tr className="text-right">
                <td></td>
                <td>Wins</td>
                <td>Losses</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">X</td>
                <td className="text-right">{results.X}</td>
                <td className="text-right">{results.O}</td>
              </tr>
              <tr>
                <td className="text-center">O</td>
                <td className="text-right">{results.O}</td>
                <td className="text-right">{results.X}</td>
              </tr>
            </tbody>
          </table>
          <hr className="border-1 border-black" />
          <div className="flex justify-center gap-2">
            <span>Draws:</span>
            <span>{results.draw}</span>
          </div>
        </>
      ) : (
        <div className="mx-auto">
          {err ? <>Could not load stats</> : <Spinner />}
        </div>
      )}
    </div>
  );
};
