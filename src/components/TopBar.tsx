import MailIcon from "@mui/icons-material/MailOutline";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import ScheduleIcon from "@mui/icons-material/ScheduleOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { COVERAGE, EMAIL, SCHEDULE_LONG } from "@/utils/nav";

const itemSx = { display: "flex", alignItems: "center", gap: 0.75 } as const;

/** Thin utility bar above the AppBar. Desktop only (design 3a). */
export default function TopBar() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        bgcolor: "primary.dark",
        color: "rgba(255,255,255,0.78)",
        fontSize: 13,
        height: 36,
      }}
    >
      <Container sx={{ height: 36 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 36 }}>
          <Stack direction="row" spacing={3}>
            <Box sx={itemSx}>
              <ScheduleIcon sx={{ fontSize: 16 }} />
              {SCHEDULE_LONG}
            </Box>
            <Box sx={itemSx}>
              <PlaceIcon sx={{ fontSize: 16 }} />
              {COVERAGE}
            </Box>
          </Stack>
          <Link
            href={`mailto:${EMAIL}`}
            underline="hover"
            sx={{ ...itemSx, color: "inherit" }}
          >
            <MailIcon sx={{ fontSize: 16 }} />
            {EMAIL}
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
