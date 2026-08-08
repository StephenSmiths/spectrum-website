import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { BASE, GOLD, GOLD_L, IVORY, TEAL, fontBody } from "@/lib/theme";

type Common = {
  label: string;
  filled?: boolean;
  icon?: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
};

export function ActionBtn({ label, filled = false, icon, href, to, onClick }: Common) {
  const [hov, setHov] = useState(false);
  const style = {
    ...fontBody,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    padding: "13px 26px",
    cursor: "pointer",
    transition: "all 0.2s",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: filled ? (hov ? GOLD_L : GOLD) : "transparent",
    color: filled ? BASE : hov ? TEAL : IVORY,
    border: filled ? "none" : `1px solid ${hov ? TEAL : "rgba(238,240,248,0.22)"}`,
  };
  const props = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style,
    onClick,
  };
  if (to) {
    return (
      <Link to={to} {...props}>
        {label}
        {icon}
      </Link>
    );
  }
  if (onClick && !href) {
    return (
      <button type="button" {...props}>
        {label}
        {icon}
      </button>
    );
  }
  return (
    <a href={href} {...props}>
      {label}
      {icon}
    </a>
  );
}

export function HeroBtn({ label, filled = false, href, to, onClick }: Common) {
  const [hov, setHov] = useState(false);
  const style = {
    ...fontBody,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    padding: "12px 24px",
    cursor: "pointer",
    transition: "all 0.2s",
    textDecoration: "none",
    display: "inline-block",
    background: filled ? (hov ? GOLD_L : GOLD) : hov ? "rgba(238,240,248,0.1)" : "transparent",
    color: filled ? BASE : IVORY,
    border: filled ? "none" : "1px solid rgba(238,240,248,0.3)",
  };
  const props = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style,
    onClick,
  };
  if (to) return <Link to={to} {...props}>{label}</Link>;
  if (onClick && !href) return <button type="button" {...props}>{label}</button>;
  return <a href={href} {...props}>{label}</a>;
}

export function ContactBtn({ label, filled = false, href, to, onClick }: Common) {
  const [hov, setHov] = useState(false);
  const style = {
    ...fontBody,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    padding: "18px 26px",
    cursor: "pointer",
    transition: "all 0.2s",
    textDecoration: "none",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: filled ? (hov ? TEAL : GOLD) : "transparent",
    color: filled ? BASE : hov ? TEAL : IVORY,
    border: filled ? "none" : `1px solid ${hov ? TEAL : "rgba(238,240,248,0.18)"}`,
  };
  const props = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style,
    onClick,
  };
  const inner = (
    <>
      {label}
      <span aria-hidden>→</span>
    </>
  );
  if (to) return <Link to={to} {...props}>{inner}</Link>;
  if (onClick && !href) return <button type="button" {...props}>{inner}</button>;
  return <a href={href} {...props}>{inner}</a>;
}
