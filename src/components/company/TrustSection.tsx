import EngineeringIcon from "@mui/icons-material/Engineering";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconBadge from "@/components/IconBadge";
import Section from "@/components/Section";

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

export default function TrustSection() {
  return (
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
  );
}
