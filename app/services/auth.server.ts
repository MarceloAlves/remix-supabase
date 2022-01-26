import type { Session } from "@supabase/gotrue-js";
import { Authenticator, AuthorizationError } from "remix-auth";
import { SupabaseStrategy } from "remix-auth-supabase";
import { sessionStorage } from "./session.server";
import { supabaseServer } from "./supabase.server";

export const supabaseStrategy = new SupabaseStrategy(
  {
    supabaseClient: supabaseServer,
    sessionStorage,
    sessionKey: "sb:session",
    sessionErrorKey: "sb:error",
  },
  async ({ req, supabaseClient }) => {
    const form = await req.formData();
    const email = form?.get("email") as string;
    const password = form?.get("password") as string;

    return supabaseClient.auth.api
      .signInWithEmail(email, password)
      .then(({ data, error }): Session => {
        if (error || !data) {
          throw new AuthorizationError(
            error?.message ?? " No user session found"
          );
        }

        console.log(data);

        return data;
      });
  }
);

export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: supabaseStrategy.sessionKey,
  sessionErrorKey: supabaseStrategy.sessionErrorKey,
});

authenticator.use(supabaseStrategy);
