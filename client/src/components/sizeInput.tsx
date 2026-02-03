import React, { useState } from "react";

export type SizeInputProps = {
  size: number;
  setSize: (number) => void;
  handleReset: (size?: number) => void;
};

export default function SizeInput({
  size,
  setSize,
  handleReset,
}: SizeInputProps) {
  return (
    <div className="text-xl flex flex-row gap-2">
      <label htmlFor="board-size">Board Size:</label>
      <input
        name="board-size"
        className="w-14 border-2 border-black px-1 rounded-md"
        type="number"
        min={3}
        max={15}
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <button
        className="rounded-md px-2 bg-slate-200 border-2 border-black"
        onClick={() => handleReset(size)}
      >
        Reset
      </button>
    </div>
  );
}
