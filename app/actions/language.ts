"use server";

import { cookies } from "next/headers";
import { isLocale } from "@/lib/i18n";

export async function setLanguage(value: string) {
  if (!isLocale(value)) throw new Error("Unsupported language");
  (await cookies()).set("va_locale", value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
