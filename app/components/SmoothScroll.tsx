"use client";

import { ReactLenis } from "lenis/react";
import { ScrollAnimations } from "./ScrollAnimations";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      }}
    >
      {children}
      <ScrollAnimations />
    </ReactLenis>
  );
}
