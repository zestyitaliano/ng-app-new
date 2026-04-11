import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "muted";
  padding?: "none" | "sm" | "md" | "lg";
};

export default function Card({
  tone = "default",
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  const toneClass = tone === "muted" ? "ng-card-muted" : "ng-card";
  const paddingClass =
    padding === "none"
      ? ""
      : padding === "sm"
        ? "p-4"
        : padding === "lg"
          ? "p-8"
          : "p-6";

  return (
    <div
      className={[toneClass, paddingClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
