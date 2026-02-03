import React from "react";
import PropTypes from "prop-types";

export type StatsProps = {};

export const Stats = ({}) => {
  return (
    <div className="flex flex-col gap-10 text-xl border-2 rounded-md border-black p-5 w-60 mb-auto mx-auto">
      <span className="text-center">Statistics</span>
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
            <td className="text-right">4</td>
            <td className="text-right">3</td>
          </tr>
          <tr>
            <td className="text-center">O</td>
            <td className="text-right">3</td>
            <td className="text-right">4</td>
          </tr>
        </tbody>
      </table>
      <hr className="border-1 border-black" />
      <div className="flex justify-center gap-2">
        <span>Draws:</span>
        <span>2</span>
      </div>
    </div>
  );
};
