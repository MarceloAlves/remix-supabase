import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.SUPABASE_URL as any,
  process.env.SUPABASE_PRIVATE_KEY as any
);
