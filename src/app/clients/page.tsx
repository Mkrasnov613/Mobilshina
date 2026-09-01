import CallIcon from "@mui/icons-material/Call";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MailIcon from "@mui/icons-material/MailOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import PhoneButton from "@/components/PhoneButton";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, SCHEDULE_LONG } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Контакти – Мобільний Шиномонтаж Одеса | Мобілшина",
  description:
    "Контакти мобільного шиномонтажу в Одесі: телефон 24/7, e-mail, зона виїзду. Форма для співпраці та спеціальні умови для автопарків від 3 авто.",
  keywords: ["контакти шиномонтаж Одеса", "телефон шиномонтаж", "автопарк обслуговування"],
  alternates: { canonical: "/clients" },
};

const ZONE_CHIPS = ["Одеса, центр", "Котовського", "Таїрова", "Совіньйон", "Фонтанка", "Передмістя"];

function ContactCard({
  icon,
  label,
  children,
  tone = "light",
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  tone?: "blue" | "light";
}) {
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

export default function ClientsPage() {
  return (
    <>
      <PageHero
        crumb="Контакти"
        title="Зв'яжіться з нами"
        lead="Найшвидше — дзвінок диспетчеру. Для автопарків від трьох авто діють окремі умови обслуговування."
      />

      <Box sx={{ bgcolor: "#F5F5F7", py: { xs: 4, md: 8 } }}>
        <Container>
          <Stack spacing={3}>
            {/* Contact cards */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
              <Box component="a" href={PHONE_HREF} sx={{ textDecoration: "none" }}>
                <ContactCard icon={<CallIcon />} label="Телефон · 24/7" tone="blue">
                  <Typography sx={{ fontSize: 22, fontWeight: 500, color: "#fff" }}>{PHONE_DISPLAY}</Typography>
                </ContactCard>
              </Box>
              <ContactCard icon={<MailIcon />} label="E-mail">
                <Link href={`mailto:${EMAIL}`} underline="hover" sx={{ fontWeight: 500 }}>
                  {EMAIL}
                </Link>
              </ContactCard>
              <ContactCard icon={<ScheduleIcon />} label="Графік">
                <Typography sx={{ fontWeight: 500 }}>{SCHEDULE_LONG}</Typography>
              </ContactCard>
            </Box>

            {/* Map + form */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, alignItems: "start" }}>
              <Paper elevation={1} sx={{ overflow: "hidden" }}>
                <Box
                  sx={{
                    height: 280,
                    display: "flex",
                    alignItems: "flex-end",
                    p: 2,
                    backgroundColor: "#DDE1EA",
                    backgroundImage:
                      "linear-gradient(rgba(20,27,184,0.10), rgba(20,27,184,0.10)), url('/images/backgrounds/location-mobilshina.png')",
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundPosition: "center, center",
                    backgroundSize: "cover, 56px",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ bgcolor: "rgba(255,255,255,0.9)", px: 1.25, py: 0.75, borderRadius: 1, color: "text.secondary" }}
                  >
                    Тут буде інтерактивна мапа зони виїзду
                  </Typography>
                </Box>
                <Stack spacing={1.5} sx={{ p: 3 }}>
                  <Typography variant="h4" component="h2">
                    Зона виїзду
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {ZONE_CHIPS.map((zone) => (
                      <Chip key={zone} label={zone} sx={{ bgcolor: "#E8EAF6", color: "primary.main", fontWeight: 500 }} />
                    ))}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Виїжджаємо і за межі міста — вартість залежить від відстані, диспетчер порахує при
                    дзвінку.
                  </Typography>
                </Stack>
              </Paper>

              <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={0.5} sx={{ mb: 2 }}>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 400 }}>
                    Для співпраці
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Автопарк, СТО, партнерство — заповніть форму, відповімо на e-mail протягом робочого
                    дня.
                  </Typography>
                </Stack>
                <ContactForm />
              </Paper>
            </Box>

            {/* Fleet band */}
            <Paper elevation={0} sx={{ bgcolor: "#14141C", color: "#fff", p: { xs: 3, md: 4 } }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <LocalShippingIcon />
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 400 }}>
                      Автопарк від 3 авто
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                      Спеціальні умови, виїзд за графіком, окремий контакт для менеджера, безготівковий
                      розрахунок.
                    </Typography>
                  </Box>
                </Stack>
                <PhoneButton
                  variant="contained"
                  size="large"
                  withIcon={false}
                  sx={{ bgcolor: "#fff", color: "#14141C", flexShrink: 0, "&:hover": { bgcolor: "#f1f1f7" } }}
                >
                  Обговорити умови
                </PhoneButton>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
