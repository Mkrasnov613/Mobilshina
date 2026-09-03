import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import AppLink from "@/components/AppLink";

interface PageHeroProps {
  title: string;
  lead?: string;
  /** breadcrumb trail label for the current page (parent is always Головна) */
  crumb: string;
  action?: ReactNode;
}

/** Blue breadcrumb hero band used on all sub-pages (design 3b–3e). */
export default function PageHero({ title, lead, crumb, action }: PageHeroProps) {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "#fff", py: { xs: 3, md: 6 } }}>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          spacing={3}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              <AppLink href="/" sx={{ color: "inherit" }} underline="hover">
                Головна
              </AppLink>
              <ChevronRightIcon sx={{ fontSize: 16 }} />
              <Box component="span" sx={{ color: "#fff" }}>
                {crumb}
              </Box>
            </Stack>
            <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 48 }, fontWeight: 400, letterSpacing: 0 }}>
              {title}
            </Typography>
            {lead && (
              <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: "rgba(255,255,255,0.8)", maxWidth: 680 }}>
                {lead}
              </Typography>
            )}
          </Stack>
          {action}
        </Stack>
      </Container>
    </Box>
  );
}
