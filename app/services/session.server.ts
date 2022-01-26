import { createCookieSessionStorage } from "remix";

const isProduction = process.env.NODE_ENV === "production";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sb",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [isProduction ? process.env.SESSION_SECRET : "secret"] as any,
    secure: isProduction,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
