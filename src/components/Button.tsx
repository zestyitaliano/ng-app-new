import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isActive = false,
  className = "",
  disabled,
  type,
  ...props
}) => {
  /**
   * Base styles
   * - No rounding (matches NG aesthetic)
   * - Strong borders
   * - Accessible focus styles
   */
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  /**
   * Variant styles (NON-active state)
   * Notes:
   * - Uses ONLY Tailwind tokens that exist in your tailwind.config.js:
   *   primary, secondary1, secondary2, offwhite
   * - Avoids undefined tokens like primaryHover/offWhite/secondary
   */
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-primary text-white border-2 border-transparent hover:brightness-95 focus:ring-primary",

    // Case option buttons (neutral w/ yellow hover)
    secondary:
      "bg-white text-slate-700 border-2 border-slate-200 hover:bg-secondary1 hover:border-secondary1 hover:text-slate-900 focus:ring-primary",

    // Clear / utility actions
    outline:
      "bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-offwhite hover:border-slate-400 focus:ring-slate-400",

    ghost:
      "bg-transparent text-slate-600 hover:bg-offwhite focus:ring-slate-400",
  };

  /**
   * Active state (overrides variant hover styles)
   * - Used for selected case buttons
   */
  const activeStyles =
    isActive && !disabled
      ? "bg-primary border-primary text-white hover:brightness-95"
      : "";

  /**
   * Sizes
   */
  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={[
        baseStyles,
        variants[variant],
        sizes[size],
        activeStyles,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
