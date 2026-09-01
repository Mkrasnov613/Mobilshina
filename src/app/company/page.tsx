import EngineeringIcon from "@mui/icons-material/Engineering";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import IconBadge from "@/components/IconBadge";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Про компанію – Мобілшина",
  description:
    "Мобілшина — сімейний бізнес мобільного шиномонтажу в Одесі з 2010 року. Наш досвід, історія та підтримка велоспорту.",
  keywords: ["про компанію", "мобільний шиномонтаж", "історія", "досвід", "Tour de France Україна"],
  alternates: { canonical: "/company" },
};

const STATS = [
  { value: "2010", label: "рік заснування" },
  { value: "2 брати", label: "засновники" },
  { value: "24/7", label: "режим роботи" },
  { value: "21 день", label: "велозбір коштів" },
];

const TIMELINE = [
  {
    title: "2010 · Початок",
    text: "Заснована двома братами як невеликий сімейний бізнес мобільного шиномонтажу.",
  },
  {
    title: "Роки зростання",
    text: "Від скромного початку до однієї з провідних компаній регіону. Принципи — надійність, швидкість, увага до кожного клієнта.",
  },
  {
    title: "Сьогодні",
    text: "Удосконалюємо послуги та технології, залучаємо нові підходи до роботи щодня.",
  },
];

const TRUST = [
  {
    icon: <ScheduleIcon />,
    title: "Цілодобово",
    text: "Виїжджаємо вночі, у вихідні та свята — коли інші вже зачинені.",
  },
  {
    icon: <PriceCheckIcon />,
    title: "Ціна до виїзду",
    text: "Суму озвучуємо по телефону. Жодних доплат «за складність» на місці.",
  },
  {
    icon: <EngineeringIcon />,
    title: "Власне обладнання",
    text: "Компресор, балансувальний станок і вулканізатор — у машині майстра.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        crumb="Про компанію"
        title="Сімейна справа з 2010 року"
        lead="Двоє братів, один мікроавтобус із обладнанням і принцип «приїхати туди, де людині потрібна допомога». З цього почалась Мобілшина."
      />

      {/* Stats strip */}
      <Box sx={{ bgcolor: "primary.dark", color: "#fff" }}>
        <Container>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" } }}>
            {STATS.map((stat, index) => (
              <Box
                key={stat.label}
                sx={{
                  textAlign: "center",
                  py: 3,
                  borderRight: { md: index < 3 ? "1px solid rgba(255,255,255,0.14)" : "none" },
                }}
              >
                <Typography sx={{ fontSize: 34, fontWeight: 400 }}>{stat.value}</Typography>
                <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Experience + timeline */}
      <Section tone="white">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 5, md: 8 } }}>
          <Stack spacing={2}>
            <Typography variant="overline" color="primary.main">
              Наш досвід
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 24, md: 34 } }}>
              Не просто «поміняти колесо»
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Ми працюємо з <strong>2010 року</strong>, надаючи послуги мобільного шиномонтажу просто там,
              де це потрібно. За ці роки ми заслужили довіру багатьох клієнтів, поєднуючи зручність,
              швидкість і якість обслуговування.
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Справжній досвід — це не лише роки роботи, а й сотні різних ситуацій на дорозі: від простих
              сезонних замін до складних випадків у поганих погодних умовах чи віддалених районах.
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Ми <strong>допомагаємо людям</strong> повернутися до своїх справ без стресу і зайвих клопотів.
              І продовжуємо вдосконалюватися щодня.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography variant="overline" color="primary.main">
              Історія
            </Typography>
            <Stack spacing={0}>
              {TIMELINE.map((item, index) => (
                <Stack key={item.title} direction="row" spacing={2.5} sx={{ pb: index < TIMELINE.length - 1 ? 3 : 0, position: "relative" }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "primary.main", mt: 0.75, flexShrink: 0, zIndex: 1 }} />
                  {index < TIMELINE.length - 1 && (
                    <Box sx={{ position: "absolute", left: 5, top: 18, bottom: 0, width: "2px", bgcolor: "divider" }} />
                  )}
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Section>

      {/* Sponsor */}
      <Box
        sx={{
          color: "#fff",
          backgroundImage:
            "linear-gradient(rgba(10,10,26,0.84), rgba(10,10,26,0.84)), url('/images/backgrounds/sponsor.png')",
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

      {/* Trust */}
      <Section tone="grey" title="Чому нам довіряють">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {TRUST.map((item) => (
            <Paper key={item.title} elevation={1} sx={{ p: 3 }}>
              <Stack spacing={1.5}>
                <IconBadge>{item.icon}</IconBadge>
                <Typography variant="h4" component="h3">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Section>

      <CtaBand title="Потрібна допомога з колесами?" callLabel="Подзвонити" />
    </>
  );
}
