import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type Tone = "white" | "grey" | "blue" | "ink";

const TONE_SX: Record<Tone, object> = {
  white: { bgcolor: "background.default", color: "text.primary" },
  grey: { bgcolor: "#F5F5F7", color: "text.primary" },
  blue: { bgcolor: "primary.main", color: "#fff" },
  ink: { bgcolor: "#14141C", color: "#fff" },
};

interface SectionProps {
  tone?: Tone;
  overline?: string;
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  /** vertical padding preset */
  dense?: boolean;
  id?: string;
  sx?: SxProps<Theme>;
}

/** Standard page section: tone background, optional overline + h2 header with a right-aligned action. */
export default function Section({
  tone = "white",
  overline,
  title,
  action,
  children,
  dense = false,
  id,
  sx,
}: SectionProps) {
  const onDark = tone === "blue" || tone === "ink";
  return (
    <Box
      id={id}
      component="section"
      sx={[
        { ...TONE_SX[tone], py: dense ? { xs: 5, md: 6 } : { xs: 6, md: 8 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container>
        {(overline || title || action) && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "flex-end" }}
            spacing={2}
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            <Box>
              {overline && (
                <Typography
                  variant="overline"
                  sx={{ color: onDark ? "rgba(255,255,255,0.7)" : "primary.main", display: "block" }}
                >
                  {overline}
                </Typography>
              )}
              {title && (
                <Typography variant="h2" sx={{ fontSize: { xs: 24, md: 34 } }}>
                  {title}
                </Typography>
              )}
            </Box>
            {action}
          </Stack>
        )}
        {children}
      </Container>
    </Box>
  );
}
