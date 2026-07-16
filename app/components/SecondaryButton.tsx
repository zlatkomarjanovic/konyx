import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";
import { ButtonLabel } from "./PrimaryButton";

type SecondaryButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "onClick">;

export function SecondaryButton({
  children,
  className = "",
  href,
  type = "button",
  onClick,
  ...props
}: SecondaryButtonProps) {
  const classes = `btn-secondary group inline-flex items-center justify-center overflow-hidden rounded-[0.625rem] ${className}`;

  if (href?.startsWith("#")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        <ButtonLabel>{children}</ButtonLabel>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        <ButtonLabel>{children}</ButtonLabel>
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      <ButtonLabel>{children}</ButtonLabel>
    </button>
  );
}
