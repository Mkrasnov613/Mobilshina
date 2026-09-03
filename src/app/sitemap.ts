import type { MetadataRoute } from "next";
import { NAV_ITEMS, SITE_URL } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return NAV_ITEMS.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
