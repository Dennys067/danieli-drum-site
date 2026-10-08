import type { SVGProps } from "react";

/** Ícones de linha fina, monocromáticos (herdam a cor via currentColor). */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 40, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Direito Previdenciário: arco de acolhimento sobre duas figuras. */
export function FamilyIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 22c0-8.8 7.2-16 16-16s16 7.2 16 16" />
      <circle cx="19" cy="24" r="3.2" />
      <circle cx="30" cy="25.5" r="2.6" />
      <path d="M12.5 40c0-4.4 2.9-8 6.5-8s6.5 3.6 6.5 8" />
      <path d="M25.5 40c0-3.6 2-6.5 4.5-6.5s4.5 2.9 4.5 6.5" />
      <path d="M24 6v3" />
    </Base>
  );
}

/** Direito Cível: documento com selo. */
export function ContractIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 6h17l7 7v29H12z" />
      <path d="M29 6v7h7" />
      <path d="M17 19h14M17 24h14M17 29h8" />
      <circle cx="30" cy="34" r="3.5" />
      <path d="M28 37.2 27 42l3-1.5 3 1.5-1-4.8" />
    </Base>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="24" cy="17" r="6" />
      <path d="M12 40c0-6.6 5.4-12 12-12s12 5.4 12 12" />
    </Base>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 24s7-12 19-12 19 12 19 12-7 12-19 12S5 24 5 24z" />
      <circle cx="24" cy="24" r="5.5" />
      <circle cx="24" cy="24" r="1.2" />
    </Base>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="24" cy="24" r="17" />
      <path d="M30.5 17.5 26.8 26.8 17.5 30.5l3.7-9.3z" />
      <path d="M24 7v3M24 38v3M7 24h3M38 24h3" />
    </Base>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="24" cy="25" r="15" />
      <path d="M24 16v9l6 4" />
      <path d="M20 6h8M24 6v4" />
    </Base>
  );
}

export function SealIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="24" cy="20" r="11" />
      <path d="m19.5 20 3 3 6-6" />
      <path d="M17.5 29 15 42l9-4 9 4-2.5-13" />
    </Base>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Base size={16} viewBox="0 0 16 16" strokeWidth={1.25} {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </Base>
  );
}
