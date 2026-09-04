export type CarTypeKey = "car" | "suv" | "minibus";
export type ServiceKey =
  | "minCall"
  | "cut"
  | "steelDisk"
  | "alloyDisk"
  | "seasonalSet"
  | "engineStart"
  | "fuel";
export type ZoneKey = "center" | "kotovsky" | "sovinyon" | "outCity";
/** "repair": ordinary call-out (diagnostics/disk/engine/fuel). "reshoe": seasonal tyre change. */
export type VisitType = "repair" | "reshoe";

export interface CarTypeOption {
  key: CarTypeKey;
  label: string;
  /** multiplies the service base price, unless the service has a carTypeOverride for this key */
  factor: number;
}

interface CarTypeOverride {
  priceId: string;
  fallback: number;
}

interface NightOverride {
  priceId: string;
  fallback: number;
}

export interface ServiceOption {
  key: ServiceKey;
  label: string;
  /** Contentful priceId for the "Легковий" tier — also the generic base for factor scaling. */
  priceId: string;
  fallback: number;
  /** "addon" adds to the мінімальний виїзд call-out; "standalone" is a complete visit price on its own. */
  mode: "addon" | "standalone";
  /**
   * Flat Contentful price for a car type whose real price isn't a multiple of
   * the base (e.g. seasonal set: sedan vs SUV/minibus are separate prices).
   * When set for the selected car type, this REPLACES base × factor.
   */
  carTypeOverrides?: Partial<Record<CarTypeKey, CarTypeOverride>>;
}

export interface ZoneOption {
  key: ZoneKey;
  label: string;
  priceId: string;
  fallback: number;
  /** when true, the calculator also asks for an approximate distance in km */
  perKm?: boolean;
  /** Flat night price for this zone (e.g. price-city-night) — REPLACES the day fee, not added to it. */
  nightOverride?: NightOverride;
}

export const CAR_TYPES: CarTypeOption[] = [
  { key: "car", label: "Легковий", factor: 1 },
  { key: "suv", label: "Позашляховик", factor: 1.25 },
  { key: "minibus", label: "Мікроавтобус", factor: 1.4 },
];

/** Real priceIds — the same ones `PriceGroups` reads for the /prices page. */
export const CALC_SERVICES: ServiceOption[] = [
  {
    key: "minCall",
    label: "Мінімальний виїзд майстра",
    priceId: "price-min-call",
    fallback: 1500,
    mode: "standalone",
    carTypeOverrides: {
      // "Кросовер, джип, D > 19″" already has its own call-out price.
      suv: { priceId: "price-suv", fallback: 2200 },
    },
  },
  { key: "cut", label: "Ремонт бокового порізу", priceId: "price-cut", fallback: 600, mode: "addon" },
  { key: "steelDisk", label: "Прокатка сталевого диска", priceId: "price-steel", fallback: 600, mode: "addon" },
  {
    key: "alloyDisk",
    label: "Ремонт легкосплавного диска",
    priceId: "price-alloy",
    fallback: 700,
    mode: "addon",
  },
  {
    key: "seasonalSet",
    label: "Перевзуття комплекту (4 колеса)",
    priceId: "price-sedan",
    fallback: 1800,
    mode: "standalone",
    carTypeOverrides: {
      // "16″–18″, кросовер, джип, мікроавтобус" covers both tiers.
      suv: { priceId: "price-suv-change", fallback: 2200 },
      minibus: { priceId: "price-suv-change", fallback: 2200 },
    },
  },
  {
    key: "engineStart",
    label: "Запуск двигуна",
    priceId: "price-start-engine",
    fallback: 1500,
    mode: "standalone",
  },
  { key: "fuel", label: "Підвіз палива", priceId: "price-fuel", fallback: 1500, mode: "standalone" },
];

/**
 * "19″–22″, легкосплавний диск" — a flat Перевзуття price for large wheels,
 * REPLACING the car-type-based price entirely (the real price list doesn't
 * split this by sedan/SUV the way the 12″–18″ tier does).
 */
export const SEASONAL_SET_LARGE_WHEEL_PRICE_ID = "price-22inch";
export const SEASONAL_SET_LARGE_WHEEL_FALLBACK = 2500;

/** "RanFlat, низький профіль" — flat Перевзуття add-on on top of whichever seasonal price applies. */
export const SEASONAL_SET_RUN_FLAT_PRICE_ID = "price-rft";
export const SEASONAL_SET_RUN_FLAT_FALLBACK = 700;

/** Perevzuttya-only travel fees ("Виїзд у випадку «Перевзуття»"). */
export const CALC_ZONES: ZoneOption[] = [
  {
    key: "center",
    label: "Одеса",
    priceId: "price-city",
    fallback: 700,
    nightOverride: { priceId: "price-city-night", fallback: 1100 },
  },
  {
    key: "kotovsky",
    label: "Котовського",
    priceId: "price-kotovsky",
    fallback: 1200,
    nightOverride: { priceId: "price-kotovsky-night", fallback: 1500 },
  },
  { key: "sovinyon", label: "Совіньйон", priceId: "price-sovinyon", fallback: 1200 },
  { key: "outCity", label: "Передмістя", priceId: "price-out-city", fallback: 90, perKm: true },
];

/** Flat call-out replacement after hours, for ordinary repair calls (not perevzuttya — see zone night prices for that). */
export const NIGHT_SURCHARGE_PRICE_ID = "price-night";
export const NIGHT_SURCHARGE_FALLBACK = 2800;

/** Night window shown next to the surcharge checkbox. */
export const NIGHT_WINDOW_LABEL = "18:00–07:00";

type PriceMap = Record<string, { amount: number | null }>;

export interface ResolvedRates {
  carTypes: CarTypeOption[];
  services: {
    key: ServiceKey;
    label: string;
    base: number;
    mode: "addon" | "standalone";
    /** flat price for a car type with its own Contentful entry — overrides base × factor */
    overrides?: Partial<Record<CarTypeKey, number>>;
  }[];
  zones: {
    key: ZoneKey;
    label: string;
    fee: number;
    perKm: boolean;
    /** flat night price for this zone, if the real price list has one */
    nightFee?: number;
  }[];
  outCityPerKm: number;
  /** flat call-out price to use at night instead of мінімальний виїзд (repair visits only) */
  nightCallOut: number;
  /** flat 19″–22″ Перевзуття price — replaces the car-type-based seasonal price entirely */
  seasonalSetLargeWheel: number;
  /** flat RunFlat / low-profile add-on for a Перевзуття visit */
  seasonalSetRunFlat: number;
}

/**
 * Merge Contentful `amount` values (from {@link getPricesView}'s `byId`) over
 * the placeholder fallbacks. Returns a plain, serialisable object safe to pass
 * from a Server Component to the client `<CalculatorCard>`.
 */
export function resolveRates(byId: PriceMap = {}): ResolvedRates {
  const amount = (priceId: string, fallback: number) => byId[priceId]?.amount ?? fallback;

  return {
    carTypes: CAR_TYPES,
    services: CALC_SERVICES.map((s) => {
      const overrideEntries = s.carTypeOverrides
        ? (Object.entries(s.carTypeOverrides) as [CarTypeKey, CarTypeOverride][])
        : [];
      const overrides = overrideEntries.length
        ? (Object.fromEntries(
            overrideEntries.map(([carKey, o]) => [carKey, amount(o.priceId, o.fallback)]),
          ) as Partial<Record<CarTypeKey, number>>)
        : undefined;
      return { key: s.key, label: s.label, base: amount(s.priceId, s.fallback), mode: s.mode, overrides };
    }),
    zones: CALC_ZONES.map((z) => ({
      key: z.key,
      label: z.label,
      fee: amount(z.priceId, z.fallback),
      perKm: Boolean(z.perKm),
      nightFee: z.nightOverride ? amount(z.nightOverride.priceId, z.nightOverride.fallback) : undefined,
    })),
    outCityPerKm: amount("price-out-city", 90),
    nightCallOut: amount(NIGHT_SURCHARGE_PRICE_ID, NIGHT_SURCHARGE_FALLBACK),
    seasonalSetLargeWheel: amount(SEASONAL_SET_LARGE_WHEEL_PRICE_ID, SEASONAL_SET_LARGE_WHEEL_FALLBACK),
    seasonalSetRunFlat: amount(SEASONAL_SET_RUN_FLAT_PRICE_ID, SEASONAL_SET_RUN_FLAT_FALLBACK),
  };
}

/** Round to the nearest 50 ₴ — estimates are never quoted to the hryvnia. */
export function round50(n: number): number {
  return Math.max(0, Math.round(n / 50) * 50);
}

export function formatUah(n: number): string {
  return `${n.toLocaleString("uk-UA")} ₴`;
}
