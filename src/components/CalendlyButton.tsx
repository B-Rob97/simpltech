"use client";

import type { ReactNode, MouseEvent } from "react";
import { openCalendlyPopup } from "@/lib/calendly";
import { siteConfig } from "@/lib/site";

type CalendlyButtonProps = {
  children: ReactNode;
  className?: string;
};

export function CalendlyButton({ children, className }: CalendlyButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    void openCalendlyPopup(siteConfig.calendlyUrl);
  };

  return (
    <a
      href={siteConfig.calendlyUrl}
      className={className}
      onClick={handleClick}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
