import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Error creating Supabase client:', error);
  throw new Error('Failed to create Supabase client. Please check your configuration.');
}

/** Elenco completo delle città, ordinato per nome. Usato dalla pagina indice /citta. */
export const getAllCities = async () => {
  const { data, error } = await supabase
    .from("ztl_electric_cities")
    .select(
      "id, name, region, free_parking, needs_display, cost, payment_method, parking_zones_description, ztl_access_description, updated_at",
    )
    .order("name");

  if (error) {
    console.error("Error fetching cities:", error);
    return [];
  }

  return data ?? [];
};

export const getCityBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("ztl_electric_cities")
    .select("*")
    .eq("id", slug)
    .single();

  if (error) {
    console.error("Error fetching city:", error);
    return null;
  }

  return data;
};

export { supabase }; 