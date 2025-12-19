"use client";

import * as React from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function LineChart({
  data,
  height = 240,
}: {
  data: number[];
  height?: number;
}) {
  const width = 640;
  const padding = { left: 36, right: 12, top: 14, bottom: 28 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxV = Math.max(1, ...data);
  const minV = Math.min(0, ...data);
  const range = Math.max(1, maxV - minV);

  const pts = data.map((v, i) => {
    const x =
      padding.left + (innerW * (data.length === 1 ? 0 : i / (data.length - 1)));
    const y = padding.top + innerH * (1 - (v - minV) / range);
    return { x, y, v };
  });

  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaD = `${d} L ${pts[pts.length - 1]?.x ?? padding.left} ${
    padding.top + innerH
  } L ${pts[0]?.x ?? padding.left} ${padding.top + innerH} Z`;

  const yTicks = 3;
  const xTicks = 5;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      role="img"
      aria-label="Line chart"
    >
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366f1" stopOpacity="0.25" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const y = padding.top + (innerH * i) / yTicks;
        return (
          <line
            key={`gy-${i}`}
            x1={padding.left}
            y1={y}
            x2={padding.left + innerW}
            y2={y}
            stroke="#e4e4e7"
            strokeWidth="1"
          />
        );
      })}
      {Array.from({ length: xTicks + 1 }).map((_, i) => {
        const x = padding.left + (innerW * i) / xTicks;
        return (
          <line
            key={`gx-${i}`}
            x1={x}
            y1={padding.top}
            x2={x}
            y2={padding.top + innerH}
            stroke="#f4f4f5"
            strokeWidth="1"
          />
        );
      })}

      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const v = maxV - (range * i) / yTicks;
        const y = padding.top + (innerH * i) / yTicks;
        return (
          <text
            key={`yl-${i}`}
            x={padding.left - 8}
            y={y + 4}
            textAnchor="end"
            fontSize="10"
            fill="#71717a"
          >
            {clamp(Math.round(v * 100) / 100, -999999, 999999)}
          </text>
        );
      })}

      <path d={areaD} fill="url(#lineFill)" />
      <path d={d} fill="none" stroke="#4f46e5" strokeWidth="2.5" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#4f46e5" />
      ))}
    </svg>
  );
}


