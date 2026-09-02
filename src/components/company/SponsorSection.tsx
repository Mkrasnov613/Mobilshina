import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function SponsorSection() {
  return (
    <Box
      sx={{
        color: "#fff",
        backgroundImage:
          "linear-gradient(rgba(10,10,26,0.84), rgba(10,10,26,0.84)), url('/img/sponsor.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 8 }, alignItems: "center" }}>
          <Stack spacing={2}>
            <Typography variant="overline" sx={{ color: "#9FA8FF" }}>
              Ми підтримуємо рух
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 24, md: 34 } }}>
              Партнер велоівентів регіону
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>
              Наша компанія стала партнером та спонсором велоівентів у регіоні — ми віримо в розвиток
              активної спільноти та здоровий спосіб життя.
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>
              Одним із таких заходів стала велоподія <strong>«Tour de France Україна»</strong>, де ми
              виступили спонсором і партнером.
            </Typography>
          </Stack>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "#fff",
              p: 4,
            }}
          >
            <Stack spacing={1.5}>
              <VolunteerActivismIcon sx={{ fontSize: 32 }} />
              <Typography sx={{ fontSize: 34, fontWeight: 400 }}>21 день у дорозі</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.65 }}>
                Під час події наш засновник організував збір коштів на підтримку біженців з Херсонської
                області, провівши 21 день у дорозі на велосипеді.
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
