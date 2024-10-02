import React, { FC } from "react";

const TimerCircle: FC<{
  value: number;
  label: string;
  color: string;
  strokeOffset: number;
  radius: number;
  circumference: number;
}> = ({ value, label, color, strokeOffset, radius, circumference }) => (
  <div>
    <svg width="200" height="200">
      <circle cx="100" cy="100" r={radius} strokeWidth="10" fill="none" />
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset}
        strokeLinecap="round"
      />
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="24px"
      >
        <tspan x="100" dy="-10" fontSize="24px">
          {value}
        </tspan>
        <tspan x="100" dy="35" fontSize="16px">
          {label}
        </tspan>
      </text>
    </svg>
  </div>
);

export default TimerCircle;
