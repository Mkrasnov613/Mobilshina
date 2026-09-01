import CalculateIcon from "@mui/icons-material/Calculate";
import CallIcon from "@mui/icons-material/Call";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HandymanIcon from "@mui/icons-material/Handyman";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import UpdateIcon from "@mui/icons-material/Update";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppLink from "@/components/AppLink";
import PageHero from "@/components/PageHero";
import PhoneButton from "@/components/PhoneButton";
import { getPricesView } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Ціни – Мобільний Шиномонтаж Одеса | Мобілшина",
  description:
    "Прозорі ціни на мобільний шиномонтаж в Одесі: мінімальна вартість виклику, «перевзуття», нічний виїзд, запуск двигуна. Точну суму диспетчер називає до виїзду.",
  keywords: [
    "ціни мобільний шиномонтаж Одеса",
    "вартість шиномонтажу",
    "виклик шиномонтажу ціна",
    "нічний виїзд",
    "переобувка авто",
  ],
  alternates: { canonical: "/prices" },
};

const GROUPS: { title: string; icon: ReactNode; priceIds: string[] }[] = [
  {
    title: "Мінімальна вартість виклику",
    icon: <CallIcon color="primary" />,
    priceIds: [
      "price-min-call",
      "price-suv",
      "price-night",
      "price-cut",
      "price-steel",
      "price-alloy",
      "price-out-city",
    ],
  },
  {
    title: "«Перевзуття» автомобіля",
    icon: <SwapHorizIcon color="primary" />,
    priceIds: ["price-sedan", "price-suv-change", "price-22inch", "price-rft"],
  },
  {
    title: "Виїзд у випадку «Перевзуття»",
    icon: <LocalShippingIcon color="primary" />,
    priceIds: [
      "price-city",
      "price-city-night",
      "price-kotovsky",
      "price-kotovsky-night",
      "price-sovinyon",
    ],
  },
  {
    title: "Додаткові послуги",
    icon: <HandymanIcon color="primary" />,
    priceIds: ["price-start-engine", "price-fuel"],
  },
];

export default async function PricesPage() {
  let view: Awaited<ReturnType<typeof getPricesView>> | null = null;
  try {
    view = await getPricesView();
  } catch {
    view = null;
  }
  const byId = view?.byId ?? {};
  const updated = view?.lastUpdate ? new Date(view.lastUpdate).toLocaleDateString("uk-UA") : null;

  return (
    <>
      <PageHero
        crumb="Ціни"
        title="Вартість послуг"
        lead="Прозорий прайс без прихованих доплат. Точну суму диспетчер називає по телефону — до того, як майстер виїде."
        action={
          updated ? (
            <Chip
              icon={<UpdateIcon />}
              label={`Оновлено ${updated}`}
              sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "#fff", "& .MuiChip-icon": { color: "#fff" } }}
            />
          ) : undefined
        }
      />

      <Box sx={{ bgcolor: "#F5F5F7", py: { xs: 4, md: 8 } }}>
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 340px" },
              gap: { xs: 3, md: 4 },
              alignItems: "start",
            }}
          >
            {/* Accordions */}
            <Box>
              {!view && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Ціни тимчасово недоступні. Актуальну вартість уточнюйте за телефоном.
                </Alert>
              )}
              {GROUPS.map((group, index) => {
                const rows = group.priceIds
                  .map((id) => byId[id])
                  .filter((row): row is { label: string; price: string } => Boolean(row && (row.label || row.price)));
                return (
                  <Accordion key={group.title} defaultExpanded={index === 0} disableGutters elevation={1}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, pr: 2 }}>
                        {group.icon}
                        <Typography sx={{ flex: 1, fontWeight: 500 }}>{group.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rows.length} {rows.length === 1 ? "позиція" : "позицій"}
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0 }}>
                      {rows.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          Уточнюйте за телефоном.
                        </Typography>
                      ) : (
                        rows.map((row, i) => (
                          <Stack
                            key={`${group.title}-${i}`}
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                            sx={{ py: 1.75, borderTop: "1px solid", borderColor: "#EEE" }}
                          >
                            <Typography variant="body2">{row.label}</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right" }}>
                              {row.price}
                            </Typography>
                          </Stack>
                        ))
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
                Назви рядків і суми підтягуються з Contentful (/api/prices).
              </Typography>
            </Box>

            {/* Sidebar */}
            <Stack spacing={2} sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <SupportAgentIcon color="primary" />
                    <Typography variant="h4" component="h2">
                      Порахувати вашу ситуацію
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Скажіть район, тип авто і що сталося — назвемо точну суму одразу.
                  </Typography>
                  <PhoneButton variant="contained" size="large" fullWidth />
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<CalculateIcon />}
                    component={AppLink}
                    href="/#calculator"
                  >
                    Калькулятор
                  </Button>
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ bgcolor: "#E8EAF6", p: 2.5 }}>
                <Stack direction="row" spacing={1.5}>
                  <InfoIcon color="primary" sx={{ mt: 0.25 }} />
                  <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>
                    Нічний виїзд (22:00–07:00) та адреси за межами міста тарифікуються окремо. Без
                    сюрпризів на місці.
                  </Typography>
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ bgcolor: "#E8F5E9", p: 2.5 }}>
                <Stack direction="row" spacing={1.5}>
                  <PaymentsIcon sx={{ color: "#2E7D32", mt: 0.25 }} />
                  <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>
                    Оплата на місці: готівка або картка. Для автопарків — безготівковий розрахунок і
                    документи.
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
