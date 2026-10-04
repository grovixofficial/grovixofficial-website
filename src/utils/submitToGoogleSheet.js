import { GOOGLE_SHEETS_URL } from '../config/sheetConfig';

/**
 * Submits form inquiry data to Google Sheets via Google Apps Script Web App.
 * 
 * @param {Object} data
 * @param {string} data.name - Client name or company
 * @param {string} data.email - Contact email or phone
 * @param {string} data.topic - Primary interest / workflow topic
 * @param {string} data.message - Bottleneck description / extra details
 * @returns {Promise<{success: boolean, reason?: string, message?: string, data?: Object}>}
 */
export async function submitToGoogleSheet(data) {
  const url = GOOGLE_SHEETS_URL?.trim();

  if (!url) {
    return {
      success: false,
      reason: 'unconfigured',
      message: 'Google Sheets endpoint is not configured yet.',
    };
  }

  const payload = {
    timestamp: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    }),
    isoTimestamp: new Date().toISOString(),
    name: data.name?.trim() || '',
    email: data.email?.trim() || '',
    topic: data.topic || 'Business Automation',
    message: data.message?.trim() || '',
    source: 'Grovix Website - LET\'S TALK Form',
  };

  try {
    // Send as text/plain with mode: 'no-cors' to avoid browser CORS preflight (OPTIONS)
    // which Google Apps Script web apps do not handle natively.
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      data: payload,
    };
  } catch (error) {
    console.error('Failed to submit inquiry to Google Sheets:', error);
    return {
      success: false,
      reason: 'network_error',
      message: error?.message || 'Could not connect to Google Sheets server.',
    };
  }
}
