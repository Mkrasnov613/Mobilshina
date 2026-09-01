import BoltIcon from "@mui/icons-material/Bolt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import AppLink from "@/components/AppLink";
import CtaBand from "@/components/CtaBand";
import IconBadge from "@/components/IconBadge";
import PhoneButton from "@/components/PhoneButton";
import Section from "@/components/Section";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Мобільний шиномонтаж в Одесі – Мобілшина",
  description:
    "Мобільний шиномонтаж в Одесі та передмісті. Виїзд майстра за 20–40 хвилин, цілодобово. Заміна та ремонт коліс, балансування, запуск двигуна, підвіз палива.",
  keywords: [
    "мобільний шиномонтаж Одеса",
    "шиномонтаж на виїзд",
    "заміна коліс",
    "ремонт шин Одеса",
    "цілодобовий шиномонтаж",
  ],
  alternates: { canonical: "/" },
};

const STATS = [
  { value: "15+", label: "років на дорогах Одеси" },
  { value: "24/7", label: "без вихідних і свят" },
  { value: "20–40", label: "хвилин до вас по місту" },
  { value: "4.9", label: "середня оцінка клієнтів" },
];

const STEPS = [
  { title: "Дзвоните диспетчеру", text: "Відповідаємо цілодобово, у середньому за 20 секунд." },
  { title: "Називаємо ціну і час", text: "До виїзду, з урахуванням району та часу доби." },
  { title: "Майстер приїжджає", text: "Мобільна станція з обладнанням просто до вашого авто." },
  { title: "Ви їдете далі", text: "Оплата на місці — готівка або картка, з чеком." },
];

const REVIEWS = [
  {
    initial: "О",
    name: "Олександр Б.",
    tag: "Google · заміна колеса",
    text: "Пробив колесо на Овідіопольській дорозі об 1 ночі. Приїхали за пів години, зробили за 20 хвилин, ціну назвали одразу по телефону.",
  },
  {
    initial: "М",
    name: "Марина Д.",
    tag: "Google · перевзуття",
    text: "Перевзувались усім офісом просто на парковці. Швидко, чисто, без черг на СТО. Тепер тільки так.",
  },
  {
    initial: "В",
    name: "Віталій С.",
    tag: "Google · автопарк",
    text: "Обслуговують наш автопарк другий рік. Виїжджають за графіком, документи в порядку, з водіями спілкуються нормально.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Box sx={{ bgcolor: "primary.main", color: "#fff", position: "relative", overflow: "hidden" }}>
        {/* decorative glow */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            right: { xs: -180, md: -120 },
            top: -200,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.14), rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <Container sx={{ py: { xs: 5, md: 10 }, position: "relative" }}>
          <Stack spacing={3} sx={{ maxWidth: 760 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<BoltIcon />}
                label="Виїзд 20–40 хв"
                sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "#fff", "& .MuiChip-icon": { color: "#fff" } }}
              />
              <Chip
                icon={<VerifiedIcon />}
                label="Працюємо з 2010"
                sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "#fff", "& .MuiChip-icon": { color: "#fff" } }}
              />
            </Stack>
            <Typography variant="h1" sx={{ fontSize: { xs: 34, md: 60 } }}>
              Мобільний шиномонтаж там, де ви зупинились
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: "rgba(255,255,255,0.82)", maxWidth: 600 }}>
              Пробили колесо на трасі, сів акумулятор чи час перевзуватись — виїжджаємо цілодобово по
              Одесі та передмістю. Вартість називаємо по телефону, до виїзду.
            </Typography>
            <Box>
              <PhoneButton
                variant="contained"
                size="large"
                sx={{ bgcolor: "#fff", color: "primary.main", "&:hover": { bgcolor: "#f1f1f7" } }}
              />
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
              {STATS.map((stat) => (
                <Box key={stat.label}>
                  <Typography sx={{ fontSize: 34, fontWeight: 400 }}>{stat.value}</Typography>
                  <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Services preview */}
      <Section
        tone="grey"
        overline="Послуги"
        title="Що робимо на виїзді"
        action={
          <AppLink
            href="/service"
            sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, fontWeight: 500, textTransform: "uppercase", fontSize: 14 }}
          >
            Усі послуги <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </AppLink>
        }
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: 3,
          }}
        >
          {SERVICES.slice(0, 8).map((service) => (
            <Paper
              key={service.title}
              elevation={1}
              sx={{ p: 3, height: "100%", transition: "box-shadow .2s", "&:hover": { boxShadow: 4 } }}
            >
              <Stack spacing={1.5}>
                <IconBadge>
                  <ServiceIcon name={service.icon} />
                </IconBadge>
                <Typography variant="h5" component="h3">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.text}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Section>

      {/* How it works */}
      <Section tone="white" overline="Як це працює" title="Чотири кроки від дзвінка до дороги">
        <Stack spacing={0} sx={{ maxWidth: 720 }}>
          {STEPS.map((step, index) => (
            <Stack key={step.title} direction="row" spacing={2.5} sx={{ pb: index < STEPS.length - 1 ? 3 : 0, position: "relative" }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                {index + 1}
              </Box>
              {index < STEPS.length - 1 && (
                <Box sx={{ position: "absolute", left: 19, top: 40, bottom: 0, width: "2px", bgcolor: "divider" }} />
              )}
              <Box sx={{ pt: 0.5 }}>
                <Typography sx={{ fontWeight: 500 }}>{step.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.text}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Section>

      {/* Reviews */}
      <Section
        tone="grey"
        overline="Відгуки"
        title="Що кажуть водії"
        action={
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography sx={{ fontSize: 34 }}>4.9</Typography>
            <Box>
              <Box sx={{ color: "#F9A825", display: "flex" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: 18 }} />
                ))}
              </Box>
              <Typography variant="caption" color="text.secondary">
                на основі відгуків Google
              </Typography>
            </Box>
          </Stack>
        }
      >
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {REVIEWS.map((review) => (
            <Paper key={review.name} elevation={1} sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box sx={{ color: "#F9A825", display: "flex" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 16 }} />
                  ))}
                </Box>
                <Typography sx={{ fontSize: 15, lineHeight: 1.6 }}>{review.text}</Typography>
                <Divider />
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 500,
                    }}
                  >
                    {review.initial}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">{review.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.tag}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Section>

      <CtaBand
        title="Колесо не чекає — і ми теж"
        text="Диспетчер на лінії просто зараз. Один дзвінок — і майстер виїжджає."
        withViber
        callLabel="Подзвонити"
      />
    </>
  );
}
