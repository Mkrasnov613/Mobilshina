"use client";

import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { reportConversion } from "@/utils/gtag";
import { PHONE_DISPLAY, PHONE_HREF } from "@/utils/nav";

interface PhoneButtonProps {
  children?: ReactNode;
  withIcon?: boolean;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "inherit";
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

/** MUI Button that dials the office and fires the Google Ads conversion. */
export default function PhoneButton({
  children = PHONE_DISPLAY,
  withIcon = true,
  ...rest
}: PhoneButtonProps) {
  return (
    <Button
      component="a"
      href={PHONE_HREF}
      startIcon={withIcon ? <CallIcon /> : undefined}
      onClick={(event) => {
        event.preventDefault();
        reportConversion(PHONE_HREF);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
