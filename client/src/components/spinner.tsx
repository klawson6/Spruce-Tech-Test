import React from "react";

export type SpinnerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const sizeMap = {
  xs: "size-5",
  sm: "size-10",
  md: "size-16",
  lg: "size-20",
  xl: "size-28",
};

export const Spinner = ({ size = "sm" }: SpinnerProps) => {
  return (
    <svg className={`animate-spin ${sizeMap[size]}`} viewBox="0 0 100 100">
      <circle
        fill="none"
        stroke-width="10"
        className="stroke-current opacity-40"
        cx="50"
        cy="50"
        r="40"
      />
      <circle
        fill="none"
        stroke-width="10"
        className="stroke-current"
        stroke-dasharray="250"
        stroke-dashoffset="210"
        cx="50"
        cy="50"
        r="40"
      />
    </svg>
  );
};
