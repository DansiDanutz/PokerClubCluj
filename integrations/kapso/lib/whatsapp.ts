/**
 * Kapso WhatsApp helper.
 *
 * Thin wrapper around the @kapso/whatsapp-cloud-api SDK. The API key is read from
 * the environment and never hard-coded. Use these helpers from server code only
 * (API routes / server actions) — never expose KAPSO_API_KEY to the client.
 */
import { WhatsAppClient, buildTemplatePayload } from '@kapso/whatsapp-cloud-api';

const BASE_URL = process.env.KAPSO_BASE_URL ?? 'https://app.kapso.ai/api/meta/';

export const PHONE_NUMBER_ID = process.env.KAPSO_PHONE_NUMBER_ID ?? '';

function getClient(): WhatsAppClient {
  const kapsoApiKey = process.env.KAPSO_API_KEY;
  if (!kapsoApiKey) throw new Error('KAPSO_API_KEY is not set');
  if (!PHONE_NUMBER_ID) throw new Error('KAPSO_PHONE_NUMBER_ID is not set');
  return new WhatsAppClient({ baseUrl: BASE_URL, kapsoApiKey });
}

/** Send a plain text WhatsApp message (only valid inside the 24h customer-service window). */
export async function sendText(to: string, body: string) {
  return getClient().messages.sendText({ phoneNumberId: PHONE_NUMBER_ID, to, body });
}

/**
 * Send an approved WhatsApp template (business-initiated). Only send to users who
 * explicitly opted in. `bodyParams` fill the {{1}}, {{2}}, ... placeholders in order.
 */
export async function sendTemplate(
  to: string,
  name: string,
  language: string,
  bodyParams: string[] = [],
) {
  const template = buildTemplatePayload({
    name,
    language,
    components: bodyParams.length
      ? [{ type: 'body', parameters: bodyParams.map((text) => ({ type: 'text', text })) }]
      : [],
  });
  return getClient().messages.sendTemplate({ phoneNumberId: PHONE_NUMBER_ID, to, template });
}
