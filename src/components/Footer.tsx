import ScheduleIcon from "@mui/icons-material/ScheduleOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import {
  EMAIL,
  LEGAL_NAME,
  NAV_ITEMS,
  PHONE_DISPLAY,
  PHONE_HREF,
  SCHEDULE_SHORT,
  ZONES,
} from "@/lib/nav";

const heading = {
  fontSize: 12,
  letterSpacing: "0.08333em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  mb: 1.5,
} as const;

const linkSx = { color: "rgba(255,255,255,0.8)", fontSize: 14, "&:hover": { color: "#fff" } } as const;

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#14141C", color: "#fff", pt: 7, pb: 3 }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1fr 1fr 1.4fr" },
          }}
        >
          <Stack spacing={2}>
            <Image
              src="/images/brand/logo-mobilshina.png"
              alt="Мобілшина"
              width={160}
              height={51}
              style={{ width: 160, height: "auto", filter: "brightness(0) invert(1)" }}
            />
            <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.6)", maxWidth: 320 }}>
              Мобільний шиномонтаж в Одесі та передмісті з 2010 року. Виїзд цілодобово.
            </Typography>
          </Stack>

          <Box>
            <Typography sx={heading}>Сторінки</Typography>
            <Stack spacing={1.25}>
              {NAV_ITEMS.map((item) => (
                <AppLink key={item.href} href={item.href} underline="none" sx={linkSx}>
                  {item.label}
                </AppLink>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography sx={heading}>Зона виїзду</Typography>
            <Stack spacing={1.25}>
              {ZONES.map((zone) => (
                <Typography key={zone} sx={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                  {zone}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography sx={heading}>Контакти</Typography>
            <Stack spacing={1.25} alignItems="flex-start">
              <Link href={PHONE_HREF} underline="none" sx={{ fontSize: 22, fontWeight: 500, color: "#fff" }}>
                {PHONE_DISPLAY}
              </Link>
              <Link href={`mailto:${EMAIL}`} underline="hover" sx={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                {EMAIL}
              </Link>
              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: "#81C784", fontSize: 14 }}>
                <ScheduleIcon sx={{ fontSize: 18 }} />
                {SCHEDULE_SHORT}
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mt: 4, mb: 2.5 }} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1}
          sx={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}
        >
          <span>© 2026 Мобілшина · {LEGAL_NAME}</span>
          <span>Одеса, Україна</span>
        </Stack>
      </Container>
    </Box>
  );
}
