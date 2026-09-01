export type ServiceCategory = "wheels" | "disks" | "roadside" | "fleet";

export interface Service {
  icon: string; // Material Symbol name (mapped to a MUI icon in ServiceIcon)
  title: string;
  text: string;
  category: ServiceCategory;
  /** highlighted with a "Найчастіше" badge */
  popular?: boolean;
}

/** Full service catalogue (design 3b). Home shows the first 8 as a preview. */
export const SERVICES: Service[] = [
  {
    icon: "directions_car",
    title: "Легковий шиномонтаж",
    text: "Зняття, розбортування, монтаж, балансування та накачування прямо на місці.",
    category: "wheels",
    popular: true,
  },
  {
    icon: "tire_repair",
    title: "Монтаж / демонтаж шини",
    text: "Заміна шин без ризику пошкодження диска чи борта покришки.",
    category: "wheels",
  },
  {
    icon: "healing",
    title: "Ремонт порізів і проколів",
    text: "Джгути, латки, вулканізація — усуваємо пошкодження будь-якої складності.",
    category: "wheels",
  },
  {
    icon: "balance",
    title: "Балансування коліс",
    text: "Прибирає вібрацію, зменшує знос гуми та підвіски.",
    category: "wheels",
  },
  {
    icon: "build_circle",
    title: 'Ремонт дисків до 22"',
    text: "Правка геометрії, зварка тріщин, реставрація сталевих і литих дисків.",
    category: "disks",
  },
  {
    icon: "air",
    title: "Ремонт камер і заміна вентилів",
    text: "Надійний ремонт проколів камер та нові вентилі для герметичності.",
    category: "wheels",
  },
  {
    icon: "battery_charging_full",
    title: "Запуск двигуна",
    text: "Прикурювання та запуск при розрядженому акумуляторі.",
    category: "roadside",
  },
  {
    icon: "local_gas_station",
    title: "Підвіз палива",
    text: "Привеземо пальне туди, де ви зупинились — вдень і вночі.",
    category: "roadside",
  },
  {
    icon: "shopping_cart",
    title: "Продаж шин",
    text: "Підбір і доставка нових шин під ваше авто та бюджет.",
    category: "wheels",
  },
  {
    icon: "swap_horiz",
    title: "Сезонне «перевзуття»",
    text: "Комплект коліс біля дому чи офісу — без черг на СТО.",
    category: "wheels",
  },
  {
    icon: "local_shipping",
    title: "Автопарки",
    text: "Обслуговування від 3 авто за графіком і з окремим тарифом.",
    category: "fleet",
  },
];

export const SERVICE_FILTERS: { key: ServiceCategory | "all"; label: string }[] = [
  { key: "all", label: "Усі" },
  { key: "wheels", label: "Колеса" },
  { key: "disks", label: "Диски" },
  { key: "roadside", label: "Допомога в дорозі" },
  { key: "fleet", label: "Автопарки" },
];
