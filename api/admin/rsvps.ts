import type { IncomingMessage, ServerResponse } from 'http';
import { getRsvps, isAdminPasswordValid } from '../../lib/rsvp';

interface JsonRequest extends IncomingMessage {
  body?: {
    password?: string;
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

  const password = req.body?.password || '';

  if (!isAdminPasswordValid(password)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const data = await getRsvps();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Failed to fetch RSVPs';
    return res.status(500).json({ success: false, error: messageText });
  }
}
