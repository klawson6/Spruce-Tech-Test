import React, { useState } from "react";
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from "../constants";

export type SizeInputProps = {
  initialSize: number;
  handleReset: (size?: number) => void;
  min?: number;
  max?: number;
};

export default function SizeInput({
  initialSize,
  handleReset,
  min = MIN_BOARD_SIZE,
  max = MAX_BOARD_SIZE,
}: SizeInputProps) {
  const [size, setSize] = useState(initialSize);

  const handleClick = () => {
    const validSize = Math.max(min, Math.min(max, size));
    if (validSize !== size) setSize(validSize);

    handleReset(validSize);
  };

  return (
    <div className="text-xl flex flex-row gap-2 mt-auto">
      <label htmlFor="board-size">Board Size:</label>
      <input
        name="board-size"
        className="w-14 border-2 border-black px-1 rounded-md"
        type="number"
        min={min}
        max={max}
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <button
        className="rounded-md px-2 bg-slate-200 border-2 border-black w-20"
        onClick={handleClick}
        aria-label={size !== initialSize ? "Apply" : "Reset"}
      >
        {size !== initialSize ? "Apply" : "Reset"}
      </button>
    </div>
  );
}
