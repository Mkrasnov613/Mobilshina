export interface NavItem {
  href: string;
  label: string;
}

/** Primary navigation order from the design (Головна · Послуги · Ціни · Контакти · Про компанію). */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Головна" },
  { href: "/service", label: "Послуги" },
  { href: "/prices", label: "Ціни" },
  { href: "/clients", label: "Контакти" },
  { href: "/company", label: "Про компанію" },
];

export const PHONE_DISPLAY = "+38 (095) 878 07 26";
export const PHONE_HREF = "tel:+380958780726";
export const VIBER_HREF = "viber://chat?number=%2B380958780726";
export const EMAIL = "mobilshina2010@gmail.com";
export const LEGAL_NAME = 'ФОП «Краснов Сергій Ігорович»';
export const CITY = "Одеса";
export const SCHEDULE_SHORT = "Цілодобово, 7/7";
export const SCHEDULE_LONG = "Цілодобово, 7 днів на тиждень";
export const COVERAGE = "Одеса та передмістя";
export const ZONES = ["Одеса", "Котовського", "Совіньйон", "Передмістя"];
export const SITE_URL = "https://mobilshina.com";
