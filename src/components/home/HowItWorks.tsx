import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Section from "@/components/Section";

const STEPS = [
  {
    title: "Дзвоните диспетчеру",
    text: "Відповідаємо цілодобово, у середньому за 20 секунд",
  },
  {
    title: "Називаємо ціну і час",
    text: "До виїзду, з урахуванням району та часу доби",
  },
  {
    title: "Майстер приїжджає",
    text: "Мобільна станція з обладнанням просто до вашого авто",
  },
  {
    title: "Ви їдете далі",
    text: "Оплата на місці",
  },
];

export default function HowItWorks() {
  return (
    <Section
      tone="white"
      overline="Як це працює"
      title="Чотири кроки від дзвінка до дороги"
    >
      <Stack spacing={0} sx={{ maxWidth: 720 }}>
        {STEPS.map((step, index) => (
          <Stack
            key={step.title}
            direction="row"
            spacing={2.5}
            sx={{
              pb: index < STEPS.length - 1 ? 3 : 0,
              position: "relative",
            }}
          >
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
              <Box
                sx={{
                  position: "absolute",
                  left: 19,
                  top: 40,
                  bottom: 0,
                  width: "2px",
                  bgcolor: "divider",
                }}
              />
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
  );
}
