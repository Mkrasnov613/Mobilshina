"use client";

import Link from "@mui/material/Link";
import type { LinkProps } from "@mui/material/Link";
import NextLink from "next/link";
import type { ReactNode } from "react";

interface AppLinkProps extends Omit<LinkProps, "component"> {
  href: string;
  children: ReactNode;
}

/** MUI-styled link that uses Next.js client-side navigation. */
export default function AppLink({ href, children, ...rest }: AppLinkProps) {
  return (
    <Link component={NextLink} href={href} {...rest}>
      {children}
    </Link>
  );
}
