import Box from "@mui/material/Box";
import type { ReactNode } from "react";

/** Round tinted icon container used across cards (design: rgba(20,27,184,0.08)). */
export default function IconBadge({ size = 48, children }: { size?: number; children: ReactNode }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: "rgba(20,27,184,0.08)",
        color: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}
