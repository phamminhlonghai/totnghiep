import { createClient } from '@supabase/supabase-js';

export interface RSVPInput {
  full_name: string;
  attending: string;
  message?: string;
}

export interface RSVPRecord extends RSVPInput {
  id: number;
  created_at: string;
}

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function saveRsvp(payload: RSVPInput) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('rsvps')
    .insert([
      {
        full_name: payload.full_name,
        attending: payload.attending,
        message: payload.message || '',
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getRsvps() {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as RSVPRecord[];
}

export function isAdminPasswordValid(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === adminPassword;
}
