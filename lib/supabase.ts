import { createClient } from "@supabase/supabase-js";

// Server-only client — reads the same project Vicious OS writes to.
// Not prefixed with NEXT_PUBLIC_: this only ever runs at build/request
// time in server components, never shipped to the browser bundle.
const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

/** Null when env vars aren't configured (e.g. local dev without .env) —
 *  callers should treat that the same as a failed fetch and fall back
 *  to mock data rather than throw. */
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;
