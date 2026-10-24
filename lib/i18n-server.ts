import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { isLocale, translator } from "@/lib/i18n";

export const getLanguage = cache(async () => {
  const value = (await cookies()).get("va_locale")?.value;
  return isLocale(value) ? value : "es";
});

export async function getTranslations() {
  return translator(await getLanguage());
}
