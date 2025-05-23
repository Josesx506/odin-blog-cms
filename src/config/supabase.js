import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON;

const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabaseClient, supabaseBucket }