import BoltIcon from "@mui/icons-material/Bolt";
import VerifiedIcon from "@mui/icons-material/Verified";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PhoneButton from "@/components/PhoneButton";
import AppLink from "../AppLink";

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/search?q=%D0%9C%D0%BE%D0%B1%D1%96%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9+%D1%88%D0%B8%D0%BD%D0%BE%D0%BC%D0%BE%D0%BD%D1%82%D0%B0%D0%B6+%D0%9E%D0%B4%D0%B5%D1%81%D0%B0";

type Stat = {
  value: string;
  label: string;
  type?: "link";
  href?: string;
};

const STATS: Stat[] = [
  { value: "15+", label: "років на дорогах Одеси" },
  { value: "24/7", label: "без вихідних і свят" },
  {
    value: "5.0",
    label: "середня оцінка клієнтів",
    type: "link",
    href: GOOGLE_BUSINESS_URL,
  },
];

export default function HomeHero() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        minHeight: { md: 600 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          display: { md: "none", lg: "block" },
          right: { lg: "5%" },
          width: { md: "58%", lg: "64%" },
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Image
          src="/images/hero/car.png"
          alt=""
          fill
          priority
          sizes="55vw"
          style={{ objectFit: "contain", objectPosition: "right bottom" }}
        />
      </Box>
      {/* brand scrim: solid on the left, feathers over the image */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: {
            xs: "none",
            md: "linear-gradient(90deg, #141BB8 0%, #141BB8 34%, rgba(20,27,184,0.72) 55%, rgba(20,27,184,0.25) 78%, rgba(20,27,184,0) 100%)",
          },
        }}
      />
      {/* top-right glow for depth */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          right: -160,
          top: -220,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12), rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <Container sx={{ py: { xs: 5, md: 10 }, position: "relative" }}>
        <Stack spacing={3} sx={{ maxWidth: 760 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<BoltIcon />}
              label="Виїзд 20–40 хв"
              sx={{
                bgcolor: "rgba(255,255,255,0.16)",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
              }}
            />
            <Chip
              icon={<VerifiedIcon />}
              label="Працюємо з 2010"
              sx={{
                bgcolor: "rgba(255,255,255,0.16)",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
              }}
            />
          </Stack>
          <Typography variant="h1" sx={{ fontSize: { xs: 34, md: 60 } }}>
            Мобільний шиномонтаж там, де ви зупинились
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: "rgba(255,255,255,0.82)",
              maxWidth: 600,
            }}
          >
            Пробили колесо на трасі, сів акумулятор чи час перевзуватись —
            виїжджаємо цілодобово по Одесі та передмістю. Вартість називаємо по
            телефону, до виїзду.
          </Typography>
          <Box>
            <PhoneButton
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#fff",
                color: "primary.main",
                "&:hover": { bgcolor: "#f1f1f7" },
              }}
            >
              Подзвонити
            </PhoneButton>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
              gap: 3,
              pt: 3,
              mt: 1,
              borderTop: "1px solid rgba(255,255,255,0.2)",
              maxWidth: 720,
            }}
          >
            {STATS.map((stat) => {
              const value =
                stat.type === "link" ? (
                  <AppLink
                    href={stat.href ?? "/reviews"}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "inherit",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {stat.value}
                  </AppLink>
                ) : (
                  stat.value
                );

              return (
                <Box key={stat.label}>
                  <Typography sx={{ fontSize: 34, fontWeight: 400 }}>
                    {value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
