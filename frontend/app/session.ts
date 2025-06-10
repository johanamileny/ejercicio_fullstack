import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: ["tuSecretoSuperSeguro"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}
