import { createClient } from '@supabase/supabase-js';
import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  body: Record<string, string>;
  query: Record<string, string | string[]>;
}

interface VercelResponse extends ServerResponse {
  status(statusCode: number): VercelResponse;
  json(body: unknown): void;
  send(body: unknown): void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { full_name, attending, message } = req.body || {};

  if (!full_name || !attending) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ success: false, error: 'Server misconfiguration: missing Supabase env vars' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('rsvps')
      .insert([{ full_name, attending, message: message || '' }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to save RSVP';
    return res.status(500).json({ success: false, error: msg });
  }
}
