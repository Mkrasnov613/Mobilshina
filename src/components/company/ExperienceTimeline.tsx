import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Section from "@/components/Section";

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

export default function ExperienceTimeline() {
  return (
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
  );
}
