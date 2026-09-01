/**
 * Contentful CDN access for the prices page. Replaces the old Express proxy
 * (`api-server/server.js` -> GET /api/prices).
 */

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

/** Revalidate cached Contentful responses hourly. */
const REVALIDATE_SECONDS = 3600;

interface ContentfulCollection<T> {
  items: { fields: T }[];
}

export interface ServiceFields {
  priceId: string;
  price: string;
  groupTitle: string;
}

export interface PriceInfoFields {
  lastUpdateDate: string;
}

export interface PricesPayload {
  services: ContentfulCollection<ServiceFields>;
  priceInfo: ContentfulCollection<PriceInfoFields>;
}

async function fetchCollection<T>(contentType: string): Promise<ContentfulCollection<T>> {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    throw new Error("Contentful env vars are not configured");
  }
  const res = await fetch(`${BASE_URL}/entries?content_type=${contentType}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Contentful ${contentType} request failed: ${res.status}`);
  }
  return res.json();
}

export async function getPricesPayload(): Promise<PricesPayload> {
  const [services, priceInfo] = await Promise.all([
    fetchCollection<ServiceFields>("service"),
    fetchCollection<PriceInfoFields>("priceInfo"),
  ]);
  return { services, priceInfo };
}

export interface PricesView {
  /** Map of priceId -> { label, price }. */
  byId: Record<string, { label: string; price: string }>;
  lastUpdate: string | null;
}

/** Convenience view for rendering the prices page. */
export async function getPricesView(): Promise<PricesView> {
  const { services, priceInfo } = await getPricesPayload();

  const byId: PricesView["byId"] = {};
  for (const { fields } of services.items) {
    if (!fields?.priceId) continue;
    byId[fields.priceId] = {
      label: fields.groupTitle ?? "",
      price: fields.price ?? "",
    };
  }

  const lastUpdate = priceInfo.items[0]?.fields?.lastUpdateDate ?? null;
  return { byId, lastUpdate };
}
