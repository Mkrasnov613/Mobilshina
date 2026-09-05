import UpdateIcon from "@mui/icons-material/Update";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PriceGroups from "@/components/prices/PriceGroups";
import PriceSidebar from "@/components/prices/PriceSidebar";
import { getPricesView } from "@/utils/contentful";
import { resolveRates } from "@/constants/calculatorRates";
import CalculatorCard from "@/components/CalculatorCard";

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

async function getRates() {
  try {
    const { byId } = await getPricesView();
    return resolveRates(byId);
  } catch {
    return resolveRates();
  }
}

export default async function PricesPage() {
  const rates = await getRates();

  let view: Awaited<ReturnType<typeof getPricesView>> | null = null;
  try {
    view = await getPricesView();
  } catch {
    view = null;
  }
  const byId = view?.byId ?? {};
  const updated = view?.lastUpdate
    ? new Date(view.lastUpdate).toLocaleDateString("uk-UA")
    : null;

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
              sx={{
                bgcolor: "rgba(255,255,255,0.16)",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
              }}
            />
          ) : undefined
        }
      />

      <Box sx={{ bgcolor: "#F5F5F7", py: { xs: 4, md: 8 } }}>
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { lg: "1fr 400px" },
              gap: { xs: 3, md: 4 },
              alignItems: "start",
            }}
          >
            <PriceGroups byId={byId} hasView={Boolean(view)} />
            <CalculatorCard rates={rates} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
