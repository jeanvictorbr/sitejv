// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verifica se as variáveis de ambiente foram carregadas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL ou Anon Key não encontradas. Verifique seu arquivo .env.local");
}

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)