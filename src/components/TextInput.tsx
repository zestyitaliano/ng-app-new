import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  tone?: "default" | "muted";
};

export default function TextInput({
  tone = "default",
  className = "",
  ...props
}: TextInputProps) {
  const toneClass = tone === "muted" ? "ng-input-muted" : "ng-input";

  return <input className={[toneClass, className].filter(Boolean).join(" ")} {...props} />;
}
