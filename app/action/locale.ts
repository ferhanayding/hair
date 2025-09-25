"use server";

import { cookies } from "next/headers";

export async function setLocaleCookie(locale: string) {
  const jar = await cookies();
  jar.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
