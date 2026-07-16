"use client";

import type { BenefitIconName } from "@/lib/benefits";

type BenefitAnimatedIconProps = {
  name: BenefitIconName;
  delay?: number;
};

const stroke = "currentColor";
const common = {
  fill: "none",
  stroke,
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BenefitAnimatedIcon({ name, delay = 0 }: BenefitAnimatedIconProps) {
  const begin = `${delay}s`;

  switch (name) {
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" aria-hidden>
          <g transform="translate(12 12)">
            <path {...common} d="M0-7V7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="8s"
                begin={begin}
                repeatCount="indefinite"
              />
            </path>
            <path {...common} d="M0-7V7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="45"
                to="405"
                dur="8s"
                begin={begin}
                repeatCount="indefinite"
              />
            </path>
            <path {...common} d="M0-7V7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="90"
                to="450"
                dur="8s"
                begin={begin}
                repeatCount="indefinite"
              />
            </path>
            <path {...common} d="M0-7V7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="135"
                to="495"
                dur="8s"
                begin={begin}
                repeatCount="indefinite"
              />
            </path>
          </g>
          <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-accent">
            <animate
              attributeName="r"
              values="1;2;1"
              dur="3s"
              begin={begin}
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );

    case "layers":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" aria-hidden>
          <path {...common} d="M12 4L4 8l8 4 8-4-8-4z">
            <animate
              attributeName="d"
              dur="4s"
              begin={begin}
              repeatCount="indefinite"
              values="
                M12 4L4 8l8 4 8-4-8-4z;
                M12 3L3 8l9 5 9-5-9-5z;
                M12 4L4 8l8 4 8-4-8-4z
              "
            />
          </path>
          <path {...common} d="M4 12l8 4 8-4">
            <animate
              attributeName="d"
              dur="4s"
              begin={begin}
              repeatCount="indefinite"
              values="
                M4 12l8 4 8-4;
                M4 13l8 5 8-5;
                M4 12l8 4 8-4
              "
            />
          </path>
          <path {...common} d="M4 16l8 4 8-4">
            <animate
              attributeName="d"
              dur="4s"
              begin={begin}
              repeatCount="indefinite"
              values="
                M4 16l8 4 8-4;
                M4 15l8 3 8-3;
                M4 16l8 4 8-4
              "
            />
          </path>
        </svg>
      );

    case "clock":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" aria-hidden>
          <circle {...common} cx="12" cy="12" r="8" />
          <path {...common} d="M12 8v4l3 2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="6s"
              begin={begin}
              repeatCount="indefinite"
            />
          </path>
        </svg>
      );

    case "coins":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" aria-hidden>
          <ellipse {...common} cx="9" cy="9" rx="5" ry="3">
            <animate
              attributeName="cx"
              values="9;10;9"
              dur="3.5s"
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="ry"
              values="3;2.2;3"
              dur="3.5s"
              begin={begin}
              repeatCount="indefinite"
            />
          </ellipse>
          <path
            {...common}
            d="M4 9v4c0 1.7 2.2 3 5 3s5-1.3 5-3V9"
          >
            <animate
              attributeName="d"
              dur="3.5s"
              begin={begin}
              repeatCount="indefinite"
              values="
                M4 9v4c0 1.7 2.2 3 5 3s5-1.3 5-3V9;
                M4 10v3c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3;
                M4 9v4c0 1.7 2.2 3 5 3s5-1.3 5-3V9
              "
            />
          </path>
          <ellipse {...common} cx="15" cy="13" rx="5" ry="3">
            <animate
              attributeName="cx"
              values="15;14;15"
              dur="3.5s"
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="ry"
              values="3;2.2;3"
              dur="3.5s"
              begin={begin}
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      );

    case "code":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" aria-hidden>
          <path {...common} d="M9 8L4 12l5 4">
            <animate
              attributeName="d"
              dur="3s"
              begin={begin}
              repeatCount="indefinite"
              values="
                M9 8L4 12l5 4;
                M8 8L3 12l5 4;
                M9 8L4 12l5 4
              "
            />
          </path>
          <path {...common} d="M15 8l5 4-5 4">
            <animate
              attributeName="d"
              dur="3s"
              begin={begin}
              repeatCount="indefinite"
              values="
                M15 8l5 4-5 4;
                M16 8l5 4-5 4;
                M15 8l5 4-5 4
              "
            />
          </path>
          <path {...common} d="M11 19l2-14">
            <animate
              attributeName="d"
              dur="3s"
              begin={begin}
              repeatCount="indefinite"
              values="
                M11 19l2-14;
                M12 19l1-14;
                M11 19l2-14
              "
            />
          </path>
        </svg>
      );

    case "rocket":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" aria-hidden>
          <g>
            <path
              {...common}
              d="M12 3c2 3 3 6 3 9a3 3 0 0 1-6 0c0-3 1-6 3-9z"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0;0 -1;0 0"
                dur="2.5s"
                begin={begin}
                repeatCount="indefinite"
              />
            </path>
            <path {...common} d="M9 14l-2 2 2 1 1-2z">
              <animate
                attributeName="d"
                dur="2.5s"
                begin={begin}
                repeatCount="indefinite"
                values="
                  M9 14l-2 2 2 1 1-2z;
                  M9 13l-3 3 2 1 2-3z;
                  M9 14l-2 2 2 1 1-2z
                "
              />
            </path>
            <path {...common} d="M15 14l2 2-2 1-1-2z">
              <animate
                attributeName="d"
                dur="2.5s"
                begin={begin}
                repeatCount="indefinite"
                values="
                  M15 14l2 2-2 1-1-2z;
                  M15 13l3 3-2 1-2-3z;
                  M15 14l2 2-2 1-1-2z
                "
              />
            </path>
            <path {...common} d="M10 18h4">
              <animate
                attributeName="d"
                dur="2.5s"
                begin={begin}
                repeatCount="indefinite"
                values="
                  M10 18h4;
                  M10 19h4;
                  M10 18h4
                "
              />
            </path>
          </g>
        </svg>
      );
  }
}
