import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  tone?: "blue" | "light";
}

export default function ContactCard({ icon, label, children, tone = "light" }: ContactCardProps) {
  const onBlue = tone === "blue";
  return (
    <Paper
      elevation={onBlue ? 2 : 1}
      sx={{ p: 3, bgcolor: onBlue ? "primary.main" : "background.paper", color: onBlue ? "#fff" : "inherit" }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: onBlue ? "rgba(255,255,255,0.18)" : "rgba(20,27,184,0.08)",
            color: onBlue ? "#fff" : "primary.main",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              letterSpacing: "0.08333em",
              textTransform: "uppercase",
              color: onBlue ? "rgba(255,255,255,0.7)" : "text.secondary",
            }}
          >
            {label}
          </Typography>
          {children}
        </Box>
      </Stack>
    </Paper>
  );
}
