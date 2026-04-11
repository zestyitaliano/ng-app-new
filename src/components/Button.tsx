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
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "ng-button ng-button-primary",
    secondary: "ng-button ng-button-secondary",
    outline: "ng-button ng-button-outline",
    ghost: "ng-button-ghost",
  };

  const activeStyles =
    isActive && !disabled
      ? "bg-primary border-primary text-white"
      : "";

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
