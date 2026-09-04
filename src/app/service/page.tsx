import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import ServicesGrid from "@/components/ServicesGrid";
import CalculatorCard from "@/components/CalculatorCard";
import { resolveRates } from "@/constants/calculatorRates";
import { getPricesView } from "@/utils/contentful";

export const metadata: Metadata = {
  title: "Послуги – Мобільний Шиномонтаж Одеса | Мобілшина",
  description:
    'Послуги мобільного шиномонтажу в Одесі: заміна та ремонт коліс, балансування, ремонт дисків до 22", запуск двигуна, підвіз палива, обслуговування автопарків. Виїзд до клієнта.',
  keywords: [
    "мобільний шиномонтаж Одеса",
    "послуги шиномонтажу",
    "ремонт шин",
    "балансування",
    "ремонт дисків",
    "запуск двигуна",
    "підвіз палива",
  ],
  alternates: { canonical: "/service" },
};



export default async function ServicePage() {
  return (
    <>
      <PageHero
        crumb="Послуги"
        title="Усе робимо на місці"
        lead="Мобільний шиномонтаж, ремонт та обслуговування коліс з виїздом до клієнта. Обладнання, компресор і балансувальний станок — у машині майстра."
      />
      <ServicesGrid />
      <CtaBand
        title="Не знайшли потрібну послугу?"
        text="Опишіть ситуацію диспетчеру — майстер підкаже, що можна зробити на місці."
        callLabel="Подзвонити"
      />
    </>
  );
}
