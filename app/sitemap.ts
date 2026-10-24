import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { navigation } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map(({ href }) => ({ url: new URL(href, site.url).href }));
}
