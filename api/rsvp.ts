import type { IncomingMessage, ServerResponse } from 'http';
import { saveRsvp } from '../lib/rsvp';

interface JsonRequest extends IncomingMessage {
  body?: {
    full_name?: string;
    attending?: string;
    message?: string;
  };
}

interface JsonResponse extends ServerResponse {
  status: (code: number) => JsonResponse;
  json: (body: unknown) => void;
}

export default async function handler(req: JsonRequest, res: JsonResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { full_name, attending, message } = req.body || {};

  if (!full_name || !attending) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const data = await saveRsvp({
      full_name,
      attending,
      message,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Failed to save RSVP';
    return res.status(500).json({ success: false, error: messageText });
  }
}
