"use client";

import { createTheme } from "@mui/material/styles";

/**
 * Google Material theme for Mobilshina, from the Claude Design canvas
 * (`design/DESIGN.md`). Brand blue #141BB8 = primary, #0F14A0 = primary.dark.
 * Roboto + Material elevation. MUI's default shadow ramp already matches
 * Material elevation, so components use `elevation={1|2|4|8}` directly.
 */

export const BRAND = {
  blue: "#141BB8",
  blueDark: "#0F14A0",
  ink: "#14141C", // footer / dark bands
  grey: "#F5F5F7", // page section background
  divider: "#E0E0E0",
  cardDivider: "#EEEEEE",
  iconChipBg: "rgba(20,27,184,0.08)",
  onBlueChipBg: "rgba(255,255,255,0.16)",
  ratingStar: "#F9A825",
  infoTint: "#E8EAF6",
  successTint: "#E8F5E9",
  contentWidth: 1200,
} as const;

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: BRAND.blue, dark: BRAND.blueDark, contrastText: "#ffffff" },
    secondary: { main: "#5D76FF" },
    success: { main: "#2E7D32" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.6)",
      disabled: "rgba(0,0,0,0.38)",
    },
    divider: BRAND.divider,
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: "var(--font-roboto), Roboto, Helvetica, Arial, sans-serif",
    h1: { fontWeight: 300, fontSize: "3.75rem", lineHeight: 1.08, letterSpacing: "-0.00833em" },
    h2: { fontWeight: 400, fontSize: "2.125rem", lineHeight: 1.2, letterSpacing: "0.00735em" },
    h3: { fontWeight: 500, fontSize: "1.5rem", lineHeight: 1.3, letterSpacing: "0em" },
    h4: { fontWeight: 500, fontSize: "1.25rem", lineHeight: 1.35, letterSpacing: "0.0075em" },
    h5: { fontWeight: 500, fontSize: "1rem", lineHeight: 1.4, letterSpacing: "0.00938em" },
    h6: { fontWeight: 500, fontSize: "0.9375rem", lineHeight: 1.5, letterSpacing: "0.00938em" },
    subtitle1: { fontWeight: 400, fontSize: "1rem", lineHeight: 1.6 },
    subtitle2: { fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.57 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    overline: {
      fontWeight: 400,
      fontSize: "0.75rem",
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
      lineHeight: 2,
    },
    button: { fontWeight: 500, letterSpacing: "0.02857em", textTransform: "uppercase" },
  },
  components: {
    MuiContainer: {
      defaultProps: { maxWidth: false },
      styleOverrides: {
        root: ({ theme: t }) => ({
          maxWidth: BRAND.contentWidth,
          [t.breakpoints.up("sm")]: { paddingLeft: 24, paddingRight: 24 },
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: false },
      styleOverrides: { root: { minHeight: 40 } },
    },
    MuiTextField: { defaultProps: { variant: "outlined" } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": { display: "none" },
          border: `1px solid ${BRAND.divider}`,
        },
      },
    },
  },
});

export default theme;
