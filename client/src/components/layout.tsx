import React from "react";
import { Stats } from "./stats";
import Game from "./game";

export const Layout = ({}) => {
  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col-reverse gap-2 md:flex-row">
        <Stats />
        <Game />
      </div>
    </div>
  );
};
