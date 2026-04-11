import React from "react";

import { COLORS } from "../constants";

export const ImageBlock: React.FC<{ className?: string; text?: string }> = ({
  className = "",
  text,
}) => (
  <div
    className={`relative flex items-center justify-center overflow-hidden border-2 ${className}`}
    style={{ borderColor: COLORS.line, backgroundColor: COLORS.fill }}
  >
    <svg
      className="absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="0" x2="100" y2="100" stroke={COLORS.line} strokeWidth="1" />
      <line x1="100" y1="0" x2="0" y2="100" stroke={COLORS.line} strokeWidth="1" />
    </svg>
    {text ? (
      <span
        className="relative z-10 border border-red-200 bg-white px-2 py-1 text-xs font-bold"
        style={{ color: COLORS.line }}
      >
        {text}
      </span>
    ) : null}
  </div>
);

export const TextBlock: React.FC<{
  lines?: number;
  className?: string;
  align?: "left" | "center" | "right";
}> = ({ lines = 3, className = "", align = "left" }) => {
  const alignClass =
    align === "center" ? "items-center" : align === "right" ? "items-end" : "items-start";

  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-2 rounded-full opacity-60"
          style={{
            backgroundColor: COLORS.textPlaceholder,
            width: `${Math.max(40, 100 - index * 15)}%`,
          }}
        />
      ))}
    </div>
  );
};

export const TitleBlock: React.FC<{ width?: string; className?: string }> = ({
  width = "60%",
  className = "",
}) => (
  <div
    className={`mb-4 h-6 rounded-sm ${className}`}
    style={{ backgroundColor: COLORS.line, width, opacity: 0.8 }}
  />
);

export const ButtonBlock: React.FC<{
  className?: string;
  variant?: "primary" | "secondary";
}> = ({ className = "", variant = "primary" }) => (
  <div
    className={`flex h-10 items-center justify-center border-2 px-6 text-sm font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] ${className}`}
    style={{
      backgroundColor: variant === "primary" ? COLORS.highlight : "transparent",
      borderColor: COLORS.accent,
      color: COLORS.accent,
    }}
  >
    CTA BUTTON
  </div>
);

export const Container: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = "", style }) => (
  <div className={`mx-auto w-full max-w-6xl px-8 ${className}`} style={style}>
    {children}
  </div>
);
