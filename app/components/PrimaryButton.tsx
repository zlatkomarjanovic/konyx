import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "onClick">;

function ButtonLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block h-5 overflow-hidden">
      <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-1/2">
        <span className="flex h-5 items-center justify-center whitespace-nowrap leading-none">
          {children}
        </span>
        <span className="flex h-5 items-center justify-center whitespace-nowrap leading-none">
          {children}
        </span>
      </span>
    </span>
  );
}

export function PrimaryButton({
  children,
  className = "",
  href,
  type = "button",
  onClick,
  ...props
}: PrimaryButtonProps) {
  const classes = `btn-primary group inline-flex items-center justify-center overflow-hidden ${className}`;

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
