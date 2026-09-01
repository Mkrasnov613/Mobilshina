"use client";

import Link from "@mui/material/Link";
import type { LinkProps } from "@mui/material/Link";
import type { ReactNode } from "react";
import { reportConversion } from "@/lib/gtag";
import { PHONE_HREF } from "@/lib/nav";

interface PhoneLinkProps extends Omit<LinkProps, "href" | "onClick"> {
  href?: string;
  children: ReactNode;
}

/**
 * `tel:` link that reports the Google Ads conversion before navigating.
 * Ported from the old `gtag_report_conversion_call` onclick handlers.
 */
export default function PhoneLink({ href = PHONE_HREF, children, ...rest }: PhoneLinkProps) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        event.preventDefault();
        reportConversion(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
