import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import type { Metadata } from "next";
import ContactCards from "@/components/clients/ContactCards";
import CooperationForm from "@/components/clients/CooperationForm";
import FleetBand from "@/components/clients/FleetBand";
import ZoneMap from "@/components/clients/ZoneMap";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Контакти – Мобільний Шиномонтаж Одеса | Мобілшина",
  description:
    "Контакти мобільного шиномонтажу в Одесі: телефон 24/7, e-mail, зона виїзду. Форма для співпраці та спеціальні умови для автопарків від 3 авто.",
  keywords: ["контакти шиномонтаж Одеса", "телефон шиномонтаж", "автопарк обслуговування"],
  alternates: { canonical: "/clients" },
};

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
            <ContactCards />

            {/* Map + form */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, alignItems: "start" }}>
              <ZoneMap />
              <CooperationForm />
            </Box>

            <FleetBand />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
