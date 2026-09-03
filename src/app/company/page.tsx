import type { Metadata } from "next";
import CompanyStats from "@/components/company/CompanyStats";
import ExperienceTimeline from "@/components/company/ExperienceTimeline";
import SponsorSection from "@/components/company/SponsorSection";
import TrustSection from "@/components/company/TrustSection";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Про компанію – Мобілшина",
  description:
    "Мобілшина — сімейний бізнес мобільного шиномонтажу в Одесі з 2010 року. Наш досвід, історія та підтримка велоспорту.",
  keywords: ["про компанію", "мобільний шиномонтаж", "історія", "досвід", "Tour de France Україна"],
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <>
      <PageHero
        crumb="Про компанію"
        title="Сімейна справа з 2010 року"
        lead="Двоє братів, один мікроавтобус із обладнанням і принцип «приїхати туди, де людині потрібна допомога». З цього почалась Мобілшина."
      />
      <CompanyStats />
      <ExperienceTimeline />
      <SponsorSection />
      <TrustSection />
      <CtaBand title="Потрібна допомога з колесами?" callLabel="Подзвонити" />
    </>
  );
}
