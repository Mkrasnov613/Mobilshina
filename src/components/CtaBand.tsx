"use client";

import CallIcon from "@mui/icons-material/Call";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { reportConversion } from "@/lib/gtag";
import { PHONE_DISPLAY, PHONE_HREF, VIBER_HREF } from "@/lib/nav";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav";
interface CtaBandProps {
  title: string;
  text?: string;
  tone?: "blue" | "ink";
  /** button label; defaults to the phone number */
  callLabel?: string;
}

export default function CtaBand({
  title,
  text,
  tone = "blue",
  callLabel = PHONE_DISPLAY,
}: CtaBandProps) {
  return (
    <Box sx={{ bgcolor: tone === "ink" ? "#14141C" : "primary.main", color: "#fff", py: { xs: 5, md: 6 } }}>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={3}
        >
          <Box>
            <Typography variant="h2" sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 400 }}>
              {title}
            </Typography>
            {text && (
              <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.8)", fontSize: 16 }}>{text}</Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1.5} flexShrink={0}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CallIcon />}
              component="a"
              href={PHONE_HREF}
              onClick={(e) => {
                e.preventDefault();
                reportConversion(PHONE_HREF);
              }}
              sx={{ bgcolor: "#fff", color: "primary.main", "&:hover": { bgcolor: "#f1f1f7" } }}
            >
              {callLabel}
            </Button>

          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
