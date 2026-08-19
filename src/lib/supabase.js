import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn('ينقص VITE_SUPABASE_URL أو VITE_SUPABASE_ANON_KEY — انسخ .env.example إلى .env');
}

export const supabase = createClient(url ?? '', key ?? '');
export const SUPABASE_URL = url ?? '';
