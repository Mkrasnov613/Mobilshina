import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesPreview from "@/components/home/ServicesPreview";

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

export default async function HomePage() {

  return (
    <>
      <HomeHero />
      <ServicesPreview />
      <HowItWorks  />
      <CtaBand
        title="Колесо не чекає — і ми теж"
        text="Диспетчер на лінії просто зараз. Один дзвінок — і майстер виїжджає."
        callLabel="Подзвонити"
      />
    </>
  );
}
